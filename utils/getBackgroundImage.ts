import { ImageAssets } from "../assets/ImageAssets";

export default function getBackgroundImage() {
    const currentHour = new Date().getHours();

    if(currentHour < 20 && currentHour > 14){
        return ImageAssets.dayImage
    }else if(currentHour >= 20){
        return ImageAssets.nightImage
    };

    return ImageAssets.morningImage;
};