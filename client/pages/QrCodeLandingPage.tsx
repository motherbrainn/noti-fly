/**
 *
 * query param must include a key which is sent to server
 * server needs to send back:
 * the prompt (are you sure...)
 * the number we need to send information to
 */

const QrCodeLandingPage = (query) => {
  console.log(query);
  return <div>qr code landing page</div>;
};

QrCodeLandingPage.getInitialProps = async ({ query }) => {
  console.log(query);
  const { id } = query;

  return query;
};

export default QrCodeLandingPage;
