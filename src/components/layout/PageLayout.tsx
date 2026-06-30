import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
