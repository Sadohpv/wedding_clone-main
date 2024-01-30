import { useState } from "react";
import styles from "../../styles/Swap.module.scss";
import classNames from "classnames/bind";
import {
  AvatarIcon,
  BellIcon,
  CloudLeft,
  CloudRight,
  DownloadIcon,
  FacebookIcon,
  GoogleIcon,
  LogoutIcon,
  MailIcon,
  Roof,
} from "../../assets/icon";
import { BearIcon } from "../../assets/svg/bear";
import { Pink_1, Pink_2 } from "../../assets/svg/pinkCloud";
import { Heart, Star } from "../../assets/svg/star";
import { Baby } from "../../assets/svg/baby";
// import { set } from "nprogress";

import { ToastAction } from "../../components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";

import { signin } from "../../services/auth";
import { SwapBox_1, SwapBox_2 } from "../../assets/svg/swapbox";
import { swapImage, swapVideo, uploadImageSwap } from "../../services/image";

const cx = classNames.bind(styles);
function Swap() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [switchToggle, setSwitchToggle] = useState(true);
  const [picOne, setPicOne] = useState("");
  const [picTwo, setPicTwo] = useState("");
  const [link1, setLink1] = useState<any>("");
  const [link2, setLink2] = useState<any>("");
  const [linkSwapImage, setLinkSwapImage] = useState("");
  const navi = useNavigate();
  const { toast } = useToast();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    if (email === "" || password === "") {
      console.log("Empty");
    } else {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        const formData = new FormData();
        formData.append("email_or_username", email);
        formData.append("password", password);
        try {
          const response: any = await signin(formData);
          const { message } = response;

          if (message === "Invalid Password!!") {
            toast({
              variant: "destructive",
              description: `${message}`,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          } else {
            toast({
              variant: "default",
              description: `Login successfully!!`,
            });
            const account = JSON.stringify(response);
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("user", account);
            navi(`/profile/edit/${response.id_user}`);
          }
        } catch (error) {
          console.log(error);
          toast({
            variant: "destructive",
            description: `Login fail!!`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } else {
        console.log("Wrong email");
      }
    }
  };
  const handleSwitchPage = (value : boolean) => {
    setSwitchToggle(value);
    setPicTwo("");
    setLink2("");
    setLinkSwapImage("");
  };
  const handleDownload = ()=>{

  }
  const handleSelectFile = () => {
    console.log("Here");
  };
  const handleInputImg = async (
    e: React.ChangeEvent<HTMLInputElement>,
    pic: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      if (pic === 1) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res1 = await uploadImageSwap(formData, 241, "nu");
        setLink1(res1);
        setPicOne(URL.createObjectURL(e.target.files[0]));
      }
      console.log("here");

      if (pic === 2) {
        const formData = new FormData();
        formData.append("src_img", e.target.files[0]);
        let res2 = await uploadImageSwap(formData, 241, "nam");
        setLink2(res2);
        // console.log("here");
        setPicTwo(URL.createObjectURL(e.target.files[0]));
      }
      if (pic === 3) {
        // const formData = new FormData();
        // formData.append("src_img", e.target.files[0]);
        // let res2 = await uploadImageSwap(formData, 241, "nam");
        // setLink2(res2);
        // console.log("here");
        setLink2(e.target.files[0]);
        setPicTwo(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
 
  const handleSwapFace = async () => {
    console.log("Click Swap")
    if (switchToggle === true) {
    console.log("Click Swap")

      const res = await swapImage(link1, link2);
      console.log(res);
      if (res) {
        setLinkSwapImage(res.sukien_2_image.link_da_swap);
      }
    }
    if (switchToggle === false) {
      console.log("Here");
      const formData = new FormData();
      formData.append("src_vid", link2);
      const res = await swapVideo(link1, formData);
      console.log(res);
      if (res) {
        setLinkSwapImage(res.sukien_swap_video.link_vid_da_swap);
      }
    }
  };
  console.log(link1);
  console.log(link2);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("image_head")}>
          <Heart />
        </div>
        <div className={cx("header")}>
          <div className={cx("logo")}>
            <Roof />
          </div>
          <div className={cx("action")}>
            <div
              className={cx("item_action", "button")}
              onClick={handleDownload}
            >
              <DownloadIcon width="16" height="16" />
              Download app
            </div>
            <div className={cx("item_action")}>
              <BellIcon width="32" height="32" />
            </div>
            <div className={cx("item_action")}>
              <AvatarIcon width="32" height="32" />
            </div>
          </div>
        </div>
        <div className={cx("image_middle")}>
          <Star />
        </div>
        <div className={cx("body")}>
          <div className={cx("body_wrapper")}>
            <div className={cx("navibar")}>
              <div
                className={cx("switch")}
                onClick={()=>handleSwitchPage(true)}
              >
                <span>Image</span>
              </div>
              <div
                className={cx("switch")}
                onClick={()=>handleSwitchPage(false)}
              >
                <span>Video</span>
              </div>
            </div>
            {switchToggle === true && (
              <>
                <div
                  className={cx("swap_box", "swap_1")}
                  onClick={handleSelectFile}
                >
                  <SwapBox_1 />

                  <div className={cx("button_swap")}>
                    {picOne != "" && (
                      <img className={cx("preview")} src={picOne} />
                    )}

                    <input type="file" onChange={(e) => handleInputImg(e, 1)} />
                  </div>
                </div>
                <div
                  className={cx("swap_box", "swap_2")}
                  onClick={handleSelectFile}
                >
                  <SwapBox_2 />
                  <div className={cx("button_swap")}>
                    {picTwo != "" && (
                      <img className={cx("preview")} src={picTwo} />
                    )}
                    <input type="file" onChange={(e) => handleInputImg(e, 2)} />
                  </div>
                </div>
                <div className={cx("action")} onClick={handleSwapFace}>
                  <span>Start</span>
                </div >
                <div className={cx("result")}>
                  <img src={linkSwapImage} />
                </div>
              </>
            )}
            {switchToggle === false && (
              <>
                <div className={cx("swap_video")}>
                  <div className={cx("input_image")}>
                    <div className={cx("input_box")}>
                      <div className={cx("input_preview")}>
                        {picOne !== "" && <img src={picOne} />}
                      </div>
                      <input
                        type="file"
                        onChange={(e) => handleInputImg(e, 1)}
                      />
                    </div>
                    <div className={cx("swap_button")} onClick={handleSwapFace}>
                      <span>Start</span>
                    </div>
                  </div>
                  <div className={cx("input_video")}>
                    <div className={cx("input_preview")}>
                      {picTwo !== "" && (
                        <video >
                          <source src={picTwo} type="video/mp4" />
                        </video>
                      )}
                    </div>
                    <input type="file" onChange={(e) => handleInputImg(e, 3)} />
                  </div>
                  <div className={cx("result")}>
                    {linkSwapImage !== "" && (
                      <video controls>
                        <source src={linkSwapImage} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={cx("image_bottom")}>
          <CloudLeft />
          <CloudRight />
          <Pink_1 />
          <BearIcon />
          <Baby />
          <Pink_2 />
        </div>
      </div>
    </>
  );
}

export default Swap;
