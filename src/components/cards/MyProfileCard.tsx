import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/User";
import { useCheckedStore } from "@/lib/stores";
import NewGroupModal from "../modals/NewGroupModal";
import MySettingModal from "../modals/MySettingModal";
import CustomLocationModal from "../modals/CustomLocationModal";
import ProfilePic from "@/components/ProfilePic";

export default function MyProfileCard({ user }: { user: User }) {
  useEffect(() => {
    if (localStorage.getItem("checked") === "true") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);
  const { checked, setChecked } = useCheckedStore();
  return (
    <div className="flex flex-col items-center justify-center gap-2 pb-2 pt-0 md:gap-0 md:pb-4 lg:px-8">
      <div className="flex min-h-full min-w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 lg:gap-6">
          <ProfilePic user={user} type="myCard" />
          <div className="flex flex-col items-start gap-2">
            <CustomLocationModal />
            <h2 className="text-xl text-darkblue lg:text-3xl">
              {user.intraName}
            </h2>
            <p className=" text-l  lg:text-xl">{user.comment}</p>
          </div>
        </div>
        <MySettingModal />
      </div>
      <div className="flex w-full flex-row justify-end gap-2">
        <Button
          className="text-l h-8 w-40 gap-1 rounded-full
           border-2 border-darkblue bg-white
           p-2 text-darkblue hover:bg-gray-200  lg:h-10 lg:w-52 lg:gap-2 lg:p-4 lg:text-xl"
          onClick={() => {
            setChecked(!checked);
            localStorage.setItem("checked", JSON.stringify(!checked));
          }}
        >
          <Checkbox checked={checked} className="size-4 border-2" size={12} />
          출근한 친구만 보기
        </Button>
        <NewGroupModal />
      </div>
    </div>
  );
}
