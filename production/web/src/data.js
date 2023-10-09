import { v4 as uuidv4 } from "uuid";
import random from "random";
import getRandomTimestampWithTimeZone from "./helpers/generateRandomTime";

const data = [
  {
    id: uuidv4(),
    email: "Hayden@althea.biz",
    text: "walaupun sudah banyak orang yang beralih kepada media komunikasi berbasis internet seperti media sosial, akan tetapi sms masih menjadi komunikasi standar yang dipakai di masyarakat",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/230554/pexels-photo-230554.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "Dallas@ole.me",
    text: "FAKTA: pelatihan dan evaluasi model dataset sms spam dengan penambahan normalisasi dapat menghasilkan model yang paling baik dibandingkan dengan yang lainnya, dengan persentase rata-rata",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "Mallory_Kunze@marie.org",
    text: "Gue mau kasih tau ajanih kalo ejakulasi dini primer itu ejakulasi dini yang selalu dialami oleh seorang pria sejak dia pertama kali melakukan hubungan seksual atau tiap kali berhubungan seksual",
    likes: random.int(0, 200),
    comments: 1,
    imageUrl: "",
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "Melissa@marie.org",
    text: "Gue cantik ga pake baju ini???",
    likes: random.int(0, 200),
    comments: 1,
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: getRandomTimestampWithTimeZone(),
  },
];

export default data;
