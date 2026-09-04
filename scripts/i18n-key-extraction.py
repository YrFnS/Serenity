#!/usr/bin/env python3
"""Extract all t('key') call sites from source and cross-check against locale catalogs.

Usage: python scripts/i18n-key-extraction.py [langs...]

Detects:
- Keys requested in code but missing from locale files.
- Keys present in catalogs but never used (dead translations).
- Regex false positives to manually review (non-translation t() calls).
"""
import re
import sys
import json
import pathlib

ROOT = pathlib.Path('.')
LOCALES_DIR = ROOT / 'public' / 'translations'
SRC_DIRS = [ROOT / 'src', ROOT / 'components', ROOT / 'pages']
SRC_FILES = [ROOT / 'Layout.tsx']

# Matches t('key') or t("key") — captures the key string
T_CALL_RE = re.compile(r"""t\(['"]([^'"]+)['"]\)""")


def extract_keys(paths):
    """Collect all unique t('key') strings from the given file paths."""
    keys = set()
    for p in paths:
        if not p.exists():
            continue
        text = p.read_text(encoding='utf-8', errors='ignore')
        for m in T_CALL_RE.finditer(text):
            keys.add(m.group(1))
    return keys


def has_key(obj, path):
    """Walk a nested dict path and return True if it resolves to a non-empty string."""
    cur = obj
    for part in path.split('.'):
        if isinstance(cur, dict) and part in cur:
            cur = cur[part]
        else:
            return False
    return isinstance(cur, str) and cur.strip()


def find_files(patterns, root=ROOT):
    """Glob-expand a list of patterns under root."""
    out = []
    for pat in patterns:
        out.extend(sorted(root.rglob(pat)))
    return out


def main():
    langs = sys.argv[1:] or ['en', 'ar']

    # Collect source files
    tsx_files = find_files(['*.tsx'])
    all_files = set(srcx_files for srcx_files in tsx_files)
    all_files.update(SRC_FILES)
    # Also scan .ts and .jsx
    all_files.update(find_files(['*.ts', '*.jsx']))

    used_keys = extract_keys(sorted(all_files))

    # Filter out known false positives
    false_positives = {'T', 'a', '.', 'category', 'open-booking-modal', ' '}
    real_keys = used_keys - false_positives

    print(f"Total t() keys extracted: {len(used_keys)}")
    print(f"False positives skipped:  {sorted(false_positives)}")
    print(f"Real keys to check:       {len(real_keys)}")
    print()

    for lang in langs:
        catalog_path = LOCALES_DIR / f'{lang}.json'
        if not catalog_path.exists():
            print(f"{lang}: catalog file not found at {catalog_path}")
            continue

        catalog = json.loads(catalog_path.read_text(encoding='utf-8'))

        missing = sorted(k for k in real_keys if not has_key(catalog, k))
        print(f"{lang}: {len(missing)} missing keys")
        for k in missing:
            print(f"  - {k}")
        print()

        # Report unused keys (present in catalog but not in code)
        def collect_paths(obj, prefix=''):
            paths = []
            if isinstance(obj, dict):
                for k, v in obj.items():
                    paths.extend(collect_paths(v, f'{prefix}.{k}' if prefix else k))
            elif isinstance(obj, str):
                paths.append(prefix)
            return paths

        catalog_paths = set(collect_paths(catalog))
        unused = sorted(catalog_paths - real_keys)
        if unused:
            print(f"{lang}: {len(unused)} unused keys (safe to remove)")
            for k in unused[:10]:
                print(f"  - {k}")
        print()


if __name__ == '__main__':
    main()
