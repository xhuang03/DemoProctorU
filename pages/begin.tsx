import router, { useRouter } from "next/router";

const DEMO_PROCTOR_OBJECT = {
  student_id: "12345-130",
  first_name: "Kirk",
  last_name: "Testing130",
  email: "kalford+testing130@meazurelearning.com",
  country: "US",
  address1: "123 here street",
  city: "Hoover",
  state: "AL",
  zipcode: "35216",
  phone1: "1234567890",
  time_zone_id: "Central Standard Time",
  description: "Record+ API Demo",
  exam_id: "071221_130",
  exam_url: `http://localhost:3000/end`,
  duration: "60",
};

const Begin: React.FC = () => {
  const router = useRouter();
  const onBegin = async () => {
    const formBody = Object.keys(DEMO_PROCTOR_OBJECT)
      .map(
        (key) =>
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(DEMO_PROCTOR_OBJECT[key])
      )
      .join("&");

    const reservationResponse = await fetch(
      "https://demo.proctoru.com/api/exams/add_record_plus_exams",
      {
        method: "POST",
        headers: {
          "Authorization-Token": "TODO-REPLACE-AUTH-TOKEN-HERE",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });

    if (reservationResponse) {
      localStorage.setItem(
        "reservationId",
        JSON.stringify(reservationResponse.reservation_uuid)
      );
      router.push(reservationResponse.url);
    }
  };

  return <button onClick={onBegin}>Begin</button>;
};

export default Begin;
