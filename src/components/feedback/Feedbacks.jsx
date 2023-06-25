import { Rate, Row, Col, Avatar, Typography, Empty, Carousel } from "antd";
import userPhoto from "./../../images/userPhoto.png";
import doctorPhoto from "./../../images/doctorPhoto.png";
import { useMediaQuery } from "react-responsive";
import { useFeedbackContext } from "../../contexts/FeedbackContextProvider";
import Loader from "../Loader";
import { useEffect } from "react";
import ServerError from "../utils/ServerError";
const { Title, Text } = Typography;

const Feedbacks = ({ home, data, noDirectFetch, username, fetchFeedback }) => {
  const { feedbackData, isLoading, isError, fetchFeedbackData } =
    useFeedbackContext();
  const isMobile = useMediaQuery({
    query: "(max-width:778px)",
  });
  useEffect(() => {
    if (noDirectFetch)
      fetchFeedbackData(
        {
          username,
        },
        fetchFeedback == false || fetchFeedback == true
      );
  }, [fetchFeedback]);
  if (isLoading) return <Loader />;
  /* ###################### after rendering page ########################## */
  const font =
    "roboto mono,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
  const bodyHandler = async (order) => {
    const bodyElement = document.getElementById(`feedback--body--${order + 1}`);
    const pragraphElement = document.getElementById(
      `feedback--pragraph--${order + 1}`
    );
    if (bodyElement.offsetHeight !== 0) {
      bodyElement.style.height = "0px";
      bodyElement.style.padding = "0px";
    } else {
      bodyElement.style.height = `${pragraphElement.offsetHeight}px`;
      bodyElement.style.padding = "10px";
    }
  };
  const { Title, Text } = Typography;
  return (
    <Col className="feedbacks--container rounded-lg mb-2 mx-2">
      <Row
        className="feedbacks--header"
        justify="space-between"
        align="center"
        style={{ fontFamily: "roboto mono,monospace" }}
      >
        {/* {feedbackData?.length ? (
          <Col span={9}>
            <Title
              className="!text-xl capitalize !text-2xl sm:!text-3xl font-medium !text-gray-700"
              style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
            >
              feedbacks
            </Title>
          </Col>
        ) : null} */}
        {/* <Col span={7}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Specialization
          </Title>
        </Col>
        <Col span={5}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Price
          </Title>
        </Col>
        <Col span={3}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Rating
          </Title>
        </Col> */}
      </Row>
      {home && isMobile ? (
        <Carousel
          autoplay
          autoplaySpeed={6000}
          dotPosition="bottom"
          className="bg-gray-200/60 rounded-3xl"
          dots={{
            className: "bg-gray-500 p-1 rounded-md",
          }}
        >
          {feedbackData ? (
            feedbackData?.map(
              (
                { feedback, rate, doctorName, username, uimgUrl, dimgUrl },
                order
              ) => (
                <div className="mb-16" key={order}>
                  <div className="lg:w-1/3 grow w-full feedback--container mb-4">
                    <Row
                      justify="space-between gap-2"
                      align="center"
                      className="feedback--header bg-gray-700 rounded-2xl border-2 border-white"
                      onClick={() => bodyHandler(order)}
                      style={{ fontSize: `${isMobile ? "12px" : "inherit"}` }}
                    >
                      <div className="p-2 flex items-center justify-between grow gap-2 bg-gray-400/30 rounded-lg">
                        <Col
                          // className="w-1/2 grow sm:w-1/4"
                          style={{ fontFamily: font }}
                          className="flex gap-1 flex-wrap items-center"
                        >
                          <Avatar src={dimgUrl || doctorPhoto} size="large" />
                          <span className="text-white font-medium text-lg sm:text-xl lg:text-xl">
                            Dr. {doctorName?.slice(0, doctorName.indexOf(" "))}
                          </span>
                        </Col>
                        <Col
                          // className="w-1/3 sm:w-1/4"
                          style={{ fontFamily: font }}
                        >
                          {<Rate disabled value={rate} />}
                        </Col>
                      </div>
                      <div className="p-2 flex grow gap-2 bg-gray-500/30 rounded-lg">
                        <Col
                          className="flex flex-wrap items-center"
                          // className="w-1/3 mt-2 sm:w-1/12"
                          style={{ fontFamily: font }}
                        >
                          <span className="text-gray-200 font-medium text-lg sm:text-xl lg:text-xl">
                            from
                          </span>
                        </Col>
                        <Col className="flex flex-wrap gap-1 items-center">
                          {/* <Text> </Text>{" "} */}
                          <Avatar src={uimgUrl || userPhoto} size="large" />
                          <span className="text-white font-medium text-lg sm:text-xl lg:text-xl">
                            {username?.slice(0, username.indexOf(" "))}
                          </span>
                        </Col>
                      </div>
                    </Row>
                    <Col
                      style={{ fontFamily: font }}
                      className="feedback--body bg-gray-500  rounded-lg"
                      id={`feedback--body--${order + 1}`}
                    >
                      <div id={`feedback--pragraph--${order + 1}`}>
                        <span className="text-gray-100 font-medium">
                          {feedback || (
                            <Empty
                              className="flex items-center flex-col w-full"
                              description={
                                <span className="text-gray-100 font-medium">
                                  there's no feedback provided
                                </span>
                              }
                            ></Empty>
                          )}
                        </span>
                      </div>
                    </Col>
                  </div>
                </div>
              )
            )
          ) : isError ? (
            <ServerError errorTitle={"Feedbacks"} />
          ) : (
            <Empty
              className="flex items-center flex-col w-full !mb-2"
              description={
                <span
                  className={`${
                    noDirectFetch ? "text-white" : "text-black"
                  } font-medium`}
                >
                  there's no feedbacks provided
                </span>
              }
            ></Empty>
          )}
        </Carousel>
      ) : feedbackData ? (
        <div className="flex flex-wrap items-start gap-2 px-3">
          {feedbackData?.map(
            (
              { feedback, rate, doctorName, username, uimgUrl, dimgUrl },
              order
            ) => (
              <div
                key={order}
                className="lg:w-1/3 grow w-full feedback--container mb-4"
              >
                <Row
                  justify="space-between gap-2"
                  align="center"
                  className="feedback--header bg-gray-700 rounded-2xl border-2 border-white"
                  onClick={() => bodyHandler(order)}
                  style={{ fontSize: `${isMobile ? "12px" : "inherit"}` }}
                >
                  <div className="p-2 flex items-center justify-between grow gap-2 bg-gray-400/30 rounded-lg">
                    <Col
                      // className="w-1/2 grow sm:w-1/4"
                      style={{ fontFamily: font }}
                      className="flex gap-1 flex-wrap items-center"
                    >
                      <Avatar src={dimgUrl || doctorPhoto} size="large" />
                      <span className="text-white font-medium text-lg sm:text-xl lg:text-xl">
                        Dr. {doctorName?.slice(0, doctorName.indexOf(" "))}
                      </span>
                    </Col>
                    <Col
                      // className="w-1/3 sm:w-1/4"
                      style={{ fontFamily: font }}
                    >
                      {<Rate disabled value={rate} />}
                    </Col>
                  </div>
                  <div className="p-2 flex grow gap-2 bg-gray-500/30 rounded-lg">
                    <Col
                      className="flex flex-wrap items-center"
                      // className="w-1/3 mt-2 sm:w-1/12"
                      style={{ fontFamily: font }}
                    >
                      <span className="text-gray-200 font-medium text-lg sm:text-xl lg:text-xl">
                        from
                      </span>
                    </Col>
                    <Col className="flex flex-wrap gap-1 items-center">
                      {/* <Text> </Text>{" "} */}
                      <Avatar src={uimgUrl || userPhoto} size="large" />
                      <span className="text-white font-medium text-lg sm:text-xl lg:text-xl">
                        {username?.slice(0, username.indexOf(" "))}
                      </span>
                    </Col>
                  </div>
                </Row>
                <Col
                  style={{ fontFamily: font }}
                  className="feedback--body bg-gray-500  rounded-lg"
                  id={`feedback--body--${order + 1}`}
                >
                  <div id={`feedback--pragraph--${order + 1}`}>
                    <span className="text-gray-100 font-medium">
                      {feedback || (
                        <Empty
                          className="flex items-center flex-col w-full"
                          description={
                            <span className="text-gray-100 font-medium">
                              there's no feedback provided
                            </span>
                          }
                        ></Empty>
                      )}
                    </span>
                  </div>
                </Col>
              </div>
            )
          )}
        </div>
      ) : isError ? (
        <ServerError errorTitle={"Feedbacks"} />
      ) : (
        <Empty
          className="flex items-center flex-col w-full !mb-2"
          description={
            <span
              className={`${
                noDirectFetch ? "text-white" : "text-black"
              } font-medium`}
            >
              there's no feedbacks provided
            </span>
          }
        ></Empty>
      )}
    </Col>
  );
};

export default Feedbacks;
