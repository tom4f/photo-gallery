import { ChangeEvent } from "react";

export type photoType = {
    id: string;
    text: string;
    autor: string;
    email: string;
    typ: string;
    header:string;
    insertDate: string;
    date: string;
    rotate: string;
    url: any;
}

export type imgPositionType = {
    smallImgStart: number;
    smallImgsSize: number;
    current: number;
    category: number;
}

export type setStateType = React.Dispatch<React.SetStateAction<imgPositionType>>

export type categoryObjType = { [key: number]: number };

export type changeType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>