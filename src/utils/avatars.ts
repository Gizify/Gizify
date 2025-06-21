import { ImageSourcePropType } from "react-native";

export type AvatarType = {
    id: string;
    source: ImageSourcePropType;
};

export const avatarList: AvatarType[] = [
    { id: "avatar1", source: require("../../assets/avatar/avatar1.png") },
    { id: "avatar2", source: require("../../assets/avatar/avatar2.png") },
    { id: "avatar3", source: require("../../assets/avatar/avatar3.png") },
    { id: "avatar4", source: require("../../assets/avatar/avatar4.png") },
    { id: "avatar5", source: require("../../assets/avatar/avatar5.png") },
    { id: "avatar6", source: require("../../assets/avatar/avatar6.png") },
];

export const getAvatarSource = (id?: string): ImageSourcePropType => {
    return avatarList.find((a) => a.id === id)?.source || require("../../assets/avatar/default-avatar.png");
};