import { CSVLink } from "react-csv";

headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" }
];

data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

<CSVDownload  data={data} headers={headers} target="_blank"/>
{/* <CSVLink data={data}  headers={headers}>Download me</CSVLink> */}
  {/* Download me
</CSVDownload >; */}