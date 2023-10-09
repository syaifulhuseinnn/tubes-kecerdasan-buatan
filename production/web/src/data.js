import { v4 as uuidv4 } from "uuid";
import random from "random";
import getRandomTimestampWithTimeZone from "./helpers/generateRandomTime";
import { PROFILE_PICT_URL } from "./constant";
import getRandomColor from "./helpers/getRandomColor";
import getRandomStyle from "./helpers/getRandomStyle";

const data = [
  {
    id: uuidv4(),
    email: "Hayden@althea.biz",
    text: "walaupun sudah banyak orang yang beralih kepada media komunikasi berbasis internet seperti media sosial, akan tetapi sms masih menjadi komunikasi standar yang dipakai di masyarakat",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/230554/pexels-photo-230554.jpeg?auto=compress&cs=tinysrgb&w=800",
    profilePictureUrl: `${PROFILE_PICT_URL}/${getRandomStyle()}/svg?backgroundColor=${getRandomColor()}`,
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
    profilePictureUrl: `${PROFILE_PICT_URL}/${getRandomStyle()}/svg?backgroundColor=${getRandomColor()}`,
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "Mallory_Kunze@marie.org",
    text: "Gue mau kasih tau ajanih kalo ejakulasi dini primer itu ejakulasi dini yang selalu dialami oleh seorang pria sejak dia pertama kali melakukan hubungan seksual atau tiap kali berhubungan seksual",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl: "",
    profilePictureUrl: `${PROFILE_PICT_URL}/${getRandomStyle()}/svg?backgroundColor=${getRandomColor()}`,
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "Melissa@marie.org",
    text: "Gue cantik ga pake baju ini???",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
    profilePictureUrl: `${PROFILE_PICT_URL}/${getRandomStyle()}/svg?backgroundColor=${getRandomColor()}`,
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "releasenine99@marie.org",
    text: "Website pemerintah bobrok, tim teknisinya masa gaada plan a,b,c. Tiap tahun permasalahannya sama aja gaada kemajuan. Ini jelek bgt sih, udah kesalahan pihak sono maintenance di detik akhir tapi ga dikasi perpanjangan kebangetan",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://pbs.twimg.com/media/F7_1msIbcAA9STn?format=jpg&name=large",
    profilePictureUrl: `https://pbs.twimg.com/profile_images/1584850344408125440/7iTYnheK_400x400.jpg`,
    createdAt: getRandomTimestampWithTimeZone(),
  },
  {
    id: uuidv4(),
    email: "KangManto123@marie.org",
    text: "Yahhhh kok jadi ngelunjak? Kembali kejamam batu dong, ayam ditukar sama beras.",
    likes: random.int(0, 200),
    comments: random.int(0, 10),
    imageUrl:
      "https://pbs.twimg.com/media/F7-lE7IbUAAaT3T?format=jpg&name=900x900",
    profilePictureUrl: `https://pbs.twimg.com/profile_images/1632593988107780096/rkbWXdxa_400x400.jpg`,
    createdAt: getRandomTimestampWithTimeZone(),
  },
];

export default data;
