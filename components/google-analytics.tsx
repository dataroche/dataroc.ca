const GA4_TAG = 'G-011LQEXL7V'
const GOOGLE_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA4_TAG}');
`

export default function GoogleAnalytics() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TAG}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: GOOGLE_SCRIPT,
        }}
      ></script>
    </>
  )
}
