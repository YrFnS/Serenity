import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Team from "@/pages/Team";
import Contact from "@/pages/Contact";
import BookingNotifications from "@/pages/BookingNotifications";
import AdminBookings from "@/pages/AdminBookings";
import Sitemap from "@/pages/Sitemap";

function App() {
  const renderPage = (PageComponent: React.ComponentType, currentPageName: string) => (
    <Layout currentPageName={currentPageName}>
      <PageComponent />
    </Layout>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={renderPage(Home, "Home")} />
        <Route path="/services" element={renderPage(Services, "Services")} />
        <Route path="/gallery" element={renderPage(Gallery, "Gallery")} />
        <Route path="/team" element={renderPage(Team, "Team")} />
        <Route path="/contact" element={renderPage(Contact, "Contact")} />
        <Route path="/bookingnotifications" element={renderPage(BookingNotifications, "BookingNotifications")} />
        <Route path="/adminbookings" element={renderPage(AdminBookings, "AdminBookings")} />
        <Route path="/sitemap" element={renderPage(Sitemap, "Sitemap")} />
        <Route
          path="*"
          element={
            <Layout currentPageName="NotFound">
              <div className="min-h-screen flex items-center justify-center bg-[#F8F2EC]">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-serif text-[#C8A882]">Page not found</h1>
                  <p className="text-gray-600">The page you are looking for does not exist.</p>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
