import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface allPhotoType {
    id         : string;
    text       : string;
    autor      : string;
    email      : string;
    typ        : string;
    header     : string;
    insertDate : string;
    date       : string;
    rotate     : string;
    imgType    : string;
}

export interface photoType extends allPhotoType {
    url?: string | ArrayBuffer | null;
}

export type imgPositionType = {
    smallImgStart : number;
    smallImgsSize : number;
    current       : number;
    category      : number;
    reload        : number;
}

export type setStateType = React.Dispatch<React.SetStateAction<imgPositionType>>

export type categoryObjType = { [key: string]: number };

export type categoryNameType = { [key: string]: string };

export type changeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>

export type categoryChangeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>


export type SmallImagesTypes = {
    eightPhoto        : Array<allPhotoType>;
    imgPosition       : imgPositionType;
    setImgPosition    : setStateType;
    arrIndexFromImgId : (clickedId:number) => number;
}

type changeTypeFunction  = ( e:changeType ) => void

export type AlertType = {
    header : string;
    text   : string;
    color? : string;
}

export type formularType = {
    editPhoto        : photoType;
    setEditPhoto     : Dispatch<SetStateAction<photoType>>;
    change           : changeTypeFunction;
    editLogic        : (event:React.MouseEvent<HTMLInputElement>, formCurrent: HTMLFormElement | null) => void;
    editCategoryLogic: (event:React.MouseEvent<HTMLInputElement>, categoryName: categoryNameType | null) => void;
    alert            : AlertType;
    setImgPosition   : setStateType;
    categoryObj      : categoryObjType;
}

export type editImage = {
    editPhoto      : photoType;
    setEditPhoto   : Dispatch<SetStateAction<photoType>>;
    setImgPosition : setStateType;
    categoryObj    : categoryObjType;
}

export type BigImageType = {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
    setAllPhoto    : React.Dispatch<React.SetStateAction<photoType[]>>
}

export type LoginType = {
    (event: React.FormEvent<HTMLFormElement>, formCurrent: HTMLFormElement | null): Promise<void>
}