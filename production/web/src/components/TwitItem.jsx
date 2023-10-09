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
} from "@chakra-ui/react";
import TwitComment from "./TwitComment";
import getRandomColor from "../helpers/getRandomColor";
import getRandomStyle from "../helpers/getRandomStyle";
import transformTimestamp from "../helpers/transformTimestamp";
import { PROFILE_PICT_URL, API_BASE_URL, COMMENTS_URL } from "../constant";
import { Formik, Form } from "formik";

function CommentForm({ handleSubmitComment }) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, actions) => {
        console.log(values);
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
          <HStack mt={{ base: 4 }} ml={{ base: 4 }}>
            <Input
              placeholder="Tulis komentar kamu"
              onChange={props.handleChange}
              value={props.values.comment}
              name="comment"
            />
            <Button
              bgColor="#8696FE"
              color="white"
              type="submit"
              isLoading={props.isSubmitting}
              loadingText="Mengirim"
              _hover={{ backgroundColor: "#4942E4" }}
            >
              Kirim
            </Button>
          </HStack>
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
}) {
  // Comment section
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  // Alert if comment contain pornoteks
  const { isOpen: isOpenAltCom, onToggle: onToggleAltCom } = useDisclosure({
    defaultIsOpen: false,
  });

  const { isOpen: isAppendNewComment, onOpen: onOpenAppendNewComment } =
    useDisclosure({
      defaultIsOpen: false,
    });

  const [commentsData, setCommentsData] = useState([]);
  const [commentsLimit, setCommentsLimit] = useState(2);
  const [commentLength, setCommentLength] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [newCommentPayload, setNewCommentPayload] = useState([]);

  const [bgColor, setBgColor] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    setBgColor(getRandomColor());
    setStyle(getRandomStyle());
  }, []);

  const getComments = async () => {
    try {
      const response = await fetch(`${COMMENTS_URL}/comments`);

      const data = await response.json();
      setCommentsData(data.slice(0, commentLength));
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
          email: "batistuta",
          body: newComment,
        };

        copyCommentsData.push(payload);

        setNewCommentPayload([...newCommentPayload, payload]);
        // setCommentsData(copyCommentsData);
        setCommentLength((prev) => (prev += 1));
        // setNewComment("");
        onOpenAppendNewComment();
      } else {
        onToggleAltCom();
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
              src={`${PROFILE_PICT_URL}/${style}/svg?backgroundColor=${bgColor}&seed=${
                email.split("@")[0]
              }`}
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
                <>
                  <TwitComment
                    key={comment.id}
                    email={comment.email}
                    text={comment.body}
                  />
                </>
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
                newCommentPayload.map((item, index) => (
                  <TwitComment
                    key={index}
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
