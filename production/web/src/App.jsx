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
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
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
import { Formik, Form } from "formik";
import * as Yup from "yup";

function UsernameForm({ isOpen, onClose, setUser }) {
  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Terlalu Pendek!")
      .max(15, "Terlalu Panjang!")
      .required("Username wajib diisi!"),
  });

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "sm" }}
      isCentered
    >
      <ModalOverlay />

      <Formik
        initialValues={{ username: "" }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          // Generate new user profile picture
          const profilePictureUrl = `${PROFILE_PICT_URL}/${getRandomStyle()}/svg?backgroundColor=${getRandomColor()}&seed=${
            values.username
          }`;
          // Save new user to local storage
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: uuidv4(),
              username: values.username,
              profile_picture: profilePictureUrl,
            })
          );

          setUser({
            id: uuidv4(),
            username: values.username,
            profile_picture: profilePictureUrl,
          });

          setTimeout(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            onClose();
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>Pengguna Baru</ModalHeader>

              <ModalBody>
                <FormControl>
                  <FormLabel>Tuliskan Username</FormLabel>
                  <Input
                    placeholder="dewa_persik"
                    type="text"
                    name="username"
                    value={props.values.username}
                    onChange={props.handleChange}
                  />
                  <FormHelperText>{props.errors.username}</FormHelperText>
                  {console.log(props.errors)}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  bgColor="#8696FE"
                  color="white"
                  type="submit"
                  loadingText="Menyimpan"
                  _hover={{ backgroundColor: "#4942E4" }}
                  isLoading={props.isSubmitting}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

function App() {
  const [user, setUser] = useState({});
  const [twits, setTwits] = useState(data);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    } else {
      onOpenModal();
    }
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
          email: `${user.username}@mail.com`,
          text: newTwit,
          likes: random.int(0, 200),
          comments: random.int(0, 10),
          imageUrl: "",
          profilePictureUrl: user.profile_picture,
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
            src={user.profile_picture}
            alt="profile picture"
            borderWidth={1}
            borderColor="black"
          />
          <Text display={{ base: "none", md: "block" }}>{user.username}</Text>
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
                  profilePictureUrl={item.profilePictureUrl}
                  user={user}
                />
              ))}
          </Stack>
        </Stack>
      </Container>
      {/* New user form */}
      <UsernameForm
        isOpen={isOpenModal}
        onClose={onCloseModal}
        setUser={setUser}
      />
    </Container>
  );
}

export default App;
