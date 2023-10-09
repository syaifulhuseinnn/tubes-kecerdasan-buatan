import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Input,
  useDisclosure,
  Avatar,
  AspectRatio,
  Alert,
  Textarea,
} from "@chakra-ui/react";
import TwitComment from "./TwitComment";
import transformTimestamp from "../helpers/transformTimestamp";
import { API_BASE_URL, COMMENTS_URL } from "../constant";
import { Formik, Form } from "formik";
import random from "random";

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

      const startIndex = random.int(0, data.length - commentLength);
      const endIndex = startIndex + commentLength;
      console.log(startIndex, endIndex);
      setCommentsData(data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMoreComments = () => setCommentsLimit((prev) => (prev += 1));

  const handleSubmitComment = async (newComment) => {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ text: newComment }),
      });

      const data = await response.json();

      if (data.prediction === "POSITIF") {
        const copyCommentsData = [...commentsData];

        const payload = {
          id: user.id,
          email: `${user.username}@mail.com`,
          body: newComment,
        };

        copyCommentsData.push(payload);

        setNewCommentPayload([...newCommentPayload, payload]);

        setCommentLength((prev) => (prev += 1));

        onOpenAppendNewComment();
        // Hide alert if comment is not contains pornoteks
        onCloseAltCom();
      } else {
        // Show alert if comment contains pornoteks
        onOpenAltCom();
      }
    } catch (error) {
      console.error(error);
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
            <AspectRatio ratio={4 / 3} mt={{ base: 4 }}>
              <Image src={imageUrl} alt="naruto" objectFit="cover" />
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
