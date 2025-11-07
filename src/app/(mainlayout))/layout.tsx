import { Footer } from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/navbar/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
