import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADA Scanner",
  description: "Accessibility Scanner powered by Playwright",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap 3.3.7 */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        {/* FontAwesome 4.7.0 */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body>
        {children}
        {/* jQuery (necessary for Bootstrap's JavaScript plugins) */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" async></script>
        {/* Bootstrap 3.3.7 JS */}
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous" async></script>
      </body>
    </html>
  );
}
