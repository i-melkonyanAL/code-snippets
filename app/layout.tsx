import { Poppins } from "next/font/google";
import Navbar from "@/layouts/auth_layout/navbar";
import QueryProvider from "@/providers/query-provider";
import "./globals.css";

const poppins = Poppins({
  weight: ["600", "400"],
  display: "auto",
  variable: "--font-poppins",
  subsets: ["latin"],
});

interface IProps {
  children: React.ReactNode;
  header: React.ReactNode;
  navigator: React.ReactNode;
}

export default function RootLayout({ children, ...props }: IProps) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <QueryProvider>
          <Navbar />
          {props.header}
          <main className="pl-[70px] pt-4 pb-20">
            <div className="container">
              {props.navigator}
              {children}
            </div>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
