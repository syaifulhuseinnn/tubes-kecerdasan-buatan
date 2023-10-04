import { v4 as uuidv4 } from "uuid";
import random from "random";
import getRandomEpochTime from "./helpers/generateRandomTime";

const data = [
  {
    id: uuidv4(),
    email: "Hayden@althea.biz",
    text: "walaupun sudah banyak orang yang beralih kepada media komunikasi berbasis internet seperti media sosial, akan tetapi sms masih menjadi komunikasi standar yang dipakai di masyarakat",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/1829007/pexels-photo-1829007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: getRandomEpochTime(),
  },
  {
    id: uuidv4(),
    email: "Dallas@ole.me",
    text: "pelatihan dan evaluasi model dataset sms spam dengan penambahan normalisasi dapat menghasilkan model yang paling baik dibandingkan dengan yang lainnya, dengan persentase rata-rata",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    createdAt: getRandomEpochTime(),
  },
  {
    id: uuidv4(),
    email: "Mallory_Kunze@marie.org",
    text: "ejakulasi dini primer yaitu ejakulasi dini yang selalu dialami oleh seorang pria sejak dia pertama kali melakukan hubungan seksual atau tiap kali berhubungan seksual",
    likes: random.int(0, 200),
    comments: 1,
    imageUrl: "",
    createdAt: getRandomEpochTime(),
  },
];

export default data;
