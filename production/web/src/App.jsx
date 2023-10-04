import { useState } from "react";
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
import formatEpochTime from "./helpers/formatEpochTime";
import getCurrentEpochTime from "./helpers/getCurrentEpochTime";

function App() {
  const [twits, setTwits] = useState(data);
  const [newTwit, setNewTwit] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const handleSubmitNewTwit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://syaifulhusein.me/predict", {
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
          createdAt: Date.now(),
        };

        copyTwits.splice(0, 0, payload);

        setTwits(copyTwits);
        setNewTwit("");
      } else {
        onOpen();
      }
    } catch (error) {
      console.error(error);
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
            src="https://api.dicebear.com/7.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
            alt="profile picture"
            borderWidth={1}
            borderColor="black"
          />
          <Text display={{ base: "none", md: "block" }}>Batistuta</Text>
        </HStack>
      </Flex>
      <Container p={{ base: 0 }}>
        <Stack direction={{ base: "column" }} p={{ base: 4 }}>
          <PostTwit
            setNewTwit={setNewTwit}
            newTwit={newTwit}
            handleSubmitNewTwit={handleSubmitNewTwit}
          />
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
              .sort((a, b) => b.createdAt - a.createdAt)
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
