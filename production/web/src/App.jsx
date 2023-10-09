import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Heading,
  Avatar,
  Stack,
  Text,
  Alert,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import PostTwit from "./components/PostTwit";
import TwitItem from "./components/TwitItem";
import data from "./data";
import { v4 as uuidv4 } from "uuid";
import random from "random";
import { API_BASE_URL, PROFILE_PICT_URL } from "./constant";
import getRandomStyle from "./helpers/getRandomStyle";
import getRandomColor from "./helpers/getRandomColor";
import getRandomTimestampWithCurrentDateTime from "./helpers/getRandomTimestampWithCurrentDateTime";

function App() {
  const [twits, setTwits] = useState(data);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [bgColor, setBgColor] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    setBgColor(getRandomColor());
    setStyle(getRandomStyle());
  }, []);

  const handleSubmitNewTwit = async (newTwit) => {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ text: newTwit }),
      });

      const data = await response.json();

      if (data.prediction === "POSITIF") {
        const copyTwits = [...twits];

        const payload = {
          id: uuidv4(),
          email: "batistuta@gmail.com",
          text: newTwit,
          likes: random.int(0, 200),
          comments: random.int(0, 10),
          createdAt: getRandomTimestampWithCurrentDateTime(),
        };

        copyTwits.splice(0, 0, payload);

        setTwits(copyTwits);
        onClose();
      } else {
        onOpen();
      }
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  return (
    <Container p={{ base: 0 }} maxW="full">
      <Flex
        bgColor="#4942E4"
        p={{ base: 4 }}
        color="white"
        justifyContent={{ base: "space-between" }}
        alignItems={{ base: "center" }}
      >
        <Heading>Twitwar</Heading>
        <HStack>
          <Avatar
            src={`${PROFILE_PICT_URL}/${style}/svg?backgroundColor=${bgColor}&seed=batistuta`}
            alt="profile picture"
            borderWidth={1}
            borderColor="black"
          />
          <Text display={{ base: "none", md: "block" }}>Batistuta</Text>
        </HStack>
      </Flex>
      <Container p={{ base: 0 }}>
        <Stack direction={{ base: "column" }} p={{ base: 4 }}>
          <PostTwit handleSubmitNewTwit={handleSubmitNewTwit} />
          <Stack
            direction={{ base: "column" }}
            my={{ base: 8 }}
            gap={{ base: 8 }}
          >
            <Alert
              status="info"
              borderRadius="md"
              display={isOpen ? "block" : "none"}
            >
              <Text>
                <Text as="span" fontSize="2xl">
                  🙅‍♂️
                </Text>{" "}
                Twit kamu <Text as="u">disembunyikan</Text> karena mengandung{" "}
                <Text as="u">pornoteks</Text>!
              </Text>
            </Alert>
            {twits
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item) => (
                <TwitItem
                  key={item.id}
                  id={item.id}
                  email={item.email}
                  text={item.text}
                  likes={item.likes}
                  comments={item.comments}
                  imageUrl={item.imageUrl}
                  createdAt={item.createdAt}
                />
              ))}
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}

export default App;
