import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  useDisclosure,
  Avatar,
  AspectRatio,
  Alert,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import TwitComment from "./TwitComment";
import transformTimestamp from "../helpers/transformTimestamp";
import { API_BASE_URL, COMMENTS_URL } from "../constant";
import { Formik, Form } from "formik";
import random from "random";
import { v4 as uuidv4 } from "uuid";
import getRandomColor from "../helpers/getRandomColor";
import getRandomStyle from "../helpers/getRandomStyle";

function CommentForm({ handleSubmitComment }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, actions) => {
        try {
          await handleSubmitComment(values.comment);
          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {(props) => (
        <Form>
          <Stack
            mt={{ base: 4 }}
            ml={{ base: 4 }}
            direction={{ base: "column" }}
          >
            <Textarea
              placeholder="Tulis komentar kamu"
              onChange={props.handleChange}
              value={props.values.comment}
              name="comment"
              resize="none"
            />
            <Button
              bgColor="#8696FE"
              color="white"
              type="submit"
              isLoading={props.isSubmitting}
              loadingText="Mengirim"
              maxWidth={{ base: "fit-content" }}
              alignSelf={{ base: "flex-end" }}
              _hover={{ backgroundColor: "#4942E4" }}
            >
              Kirim
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function TwitItem({
  id,
  email,
  text,
  likes,
  comments,
  createdAt,
  imageUrl,
  profilePictureUrl,
  user,
}) {
  const toast = useToast();

  // Comment section
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  // Alert if comment contain pornoteks
  const {
    isOpen: isOpenAltCom,
    onOpen: onOpenAltCom,
    onClose: onCloseAltCom,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isAppendNewComment, onOpen: onOpenAppendNewComment } =
    useDisclosure({
      defaultIsOpen: false,
    });

  const [commentsData, setCommentsData] = useState([]);
  const [commentsLimit, setCommentsLimit] = useState(2);
  const [commentLength, setCommentLength] = useState(comments + 1);
  const [newCommentPayload, setNewCommentPayload] = useState([]);

  const getComments = async () => {
    try {
      const response = await fetch(`${COMMENTS_URL}/comments`);
      const data = await response.json();
      const newData = [...data].map((item) => {
        item.profilePictureUrl = `https://api.dicebear.com/7.x/${getRandomStyle()}/svg?seed=${
          email.split("@")[0]
        }&backgroundColor=${getRandomColor()}`;

        return item;
      });
      // console.log(newData);

      const startIndex = random.int(0, data.length - commentLength);
      const endIndex = startIndex + commentLength;

      setCommentsData(newData.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMoreComments = () => setCommentsLimit((prev) => (prev += 1));

  const handleSubmitComment = async (newComment) => {
    // Hide alert if comment is not contains pornoteks
    onCloseAltCom();
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.prediction === "POSITIF") {
        const payload = {
          id: uuidv4(),
          email: `${user.username}@mail.com`,
          body: newComment,
          profilePictureUrl: user.profile_picture,
        };

        setNewCommentPayload([...newCommentPayload, payload]);

        setCommentLength((prev) => (prev += 1));

        onOpenAppendNewComment();
      } else {
        // Show alert if comment contains pornoteks
        onOpenAltCom();
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error(
          "Network request failed. Check your internet connection or server availability."
        );
        toast({
          title: `Error`,
          description:
            "Network request failed. Check your internet connection or server availability.",
          status: "error",
          isClosable: true,
        });
      } else if (error.message === "Network response was not ok") {
        console.error("Server is not reachable or refused the connection.");
        toast({
          title: `Error`,
          description: "Server is not reachable or refused the connection.",
          status: "error",
          isClosable: true,
        });
      } else {
        console.error("Fetch error:", error.message);
        toast({
          title: `Error`,
          description: `Fetch error: ${error.message}`,
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    // get comments data if comments section is open
    if (isOpen) {
      if (commentsData.length < 1) {
        getComments();
      }
    }
  }, [isOpen]);

  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      <Stack direction={{ base: "column" }} gap={4}>
        <Stack
          direction={{ base: "row" }}
          justifyContent={{ base: "space-between" }}
          gap={{ base: 4 }}
        >
          <HStack>
            <Avatar
              src={profilePictureUrl}
              size={{ base: "md" }}
              borderWidth={1}
              borderColor="black"
            />
            <Stack direction={{ base: "column" }} gap={{ base: 1 }}>
              <Heading size={{ base: "sm" }}>{email.split("@")[0]}</Heading>
              <Text as="small" color="gray.500" textTransform="lowercase">
                @{email.split("@")[0]}
              </Text>
            </Stack>
          </HStack>
          <Text as="small" color="gray.500" mt={{ base: 1 }}>
            {transformTimestamp(createdAt)}
          </Text>
        </Stack>
        <Box>
          {/* Caption */}
          <Text>{text}</Text>
          {/* Twit image if exist */}
          {imageUrl && (
            <AspectRatio ratio={1 / 1} mt={{ base: 4 }}>
              <Image
                src={imageUrl}
                alt="naruto"
                objectFit="cover"
                loading="lazy"
              />
            </AspectRatio>
          )}
          {/* Button Likes and Comments */}
          <Stack direction="row" gap={{ base: 4 }} mt={{ base: 4 }}>
            <Button variant="link">❤️ {likes}</Button>
            <Button
              variant="link"
              onClick={onToggle}
              display={commentLength > 0 ? "block" : "none"}
            >
              💬 {commentLength}
            </Button>
          </Stack>
          {/* Comments list */}
          {isOpen && (
            <>
              {commentsData.length < 1 && <Text as="small">Loading...</Text>}
              {commentsData.slice(0, commentsLimit).map((comment) => (
                <TwitComment
                  key={comment.id}
                  id={comment.id}
                  email={comment.email}
                  text={comment.body}
                  profilePictureUrl={comment.profilePictureUrl}
                />
              ))}
              {/* Button load more comments */}
              <Button
                variant="link"
                size="xs"
                ml={{ base: 4 }}
                mt={{ base: 4 }}
                onClick={handleLoadMoreComments}
                display={commentLength <= commentsLimit ? "none" : "block"}
              >
                Lihat komentar lainnya
              </Button>
              {/* Merge new comment to existing */}
              {isAppendNewComment &&
                newCommentPayload.map((item) => (
                  <TwitComment
                    key={item.id}
                    id={item.id}
                    email={item.email}
                    text={item.body}
                    profilePictureUrl={item.profilePictureUrl}
                  />
                ))}
              {/* Show alert if new comment contains pornoteks */}
              <Alert
                status="info"
                borderRadius="md"
                display={isOpenAltCom ? "flex" : "none"}
                mt={{ base: 4 }}
              >
                <Text>
                  ℹ️ Komentar kamu <Text as="u">disembunyikan</Text> karena
                  mengandung <Text as="u">pornoteks</Text>!
                </Text>
              </Alert>
              {/* New comment form */}
              {<CommentForm handleSubmitComment={handleSubmitComment} />}
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
