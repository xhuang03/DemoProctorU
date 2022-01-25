const End: React.FC = () => {
  const onSubmit = async () => {
    if (typeof window !== "undefined") {
      const reservationId = localStorage?.getItem("reservationId").toString();
      const fulfillObject = {
        reservation_uuid: JSON.parse(reservationId),
      };
      const formBody = Object.keys(fulfillObject)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(fulfillObject[key])
        )
        .join("&");

      await fetch(
        "https://demo.proctoru.com/api/exams/add_record_plus_exams/fulfill",
        {
          method: "POST",
          headers: {
            "Authorization-Token": "TODO-REPLACE-AUTH-TOKEN-HERE",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        }
      );
    }
  };
  return <button onClick={onSubmit}>Submit</button>;
};

export default End;
