import { CSSProperties, FC } from "react";
import cx from 'classnames';

import { HCard as HCardType } from "../types";

export interface HCardProps extends HCardType {
    className?: string;
    style?: CSSProperties;
}

const HCard: FC<HCardProps> = (props) => (
    <div className={cx("h-card text-left shadow rounded-md", props.className)} style={props.style}>
        <div className="flex flex-row gap-4 p-2">
            <div className="max-w-sm self-center">
                {props.photoRef && <img className="u-photo rounded-full" src={props.photoRef} />}
            </div>
            <div>
                {props.name && <h3 className="p-name font-bold">{props.name}</h3>}
                <div className="mb-4">
                    {props.honorificPrefix && <span className="p-honorific-prefix mr-1">{props.honorificPrefix}</span>}
                    {props.givenName && <span className="p-given-name mr-1">{props.givenName}</span>}
                    {props.familyName && <span className="p-family-name mr-1">{props.familyName}</span>}
                    {props.nickname && <span>(<span className="p-nickname">{props.nickname}</span>)</span>}
                </div>
                {props.note && <blockquote className="p-note -mt-2 mb-4 italic">{props.note}</blockquote>}
                <div className="mb-4">
                    <h4 className="font-bold">Contact</h4>
                    <ul className="list-inside list-disc ml-2">
                        {props.url && <li><a className={cx("u-url", {'u-uid': props.main})} href={props.url}>web</a></li>}
                        {props.email && <li><a className="u-email" href={`mailto:${props.email}`}>email</a></li>}
                    </ul>
                </div>
                <ul className="block">
                    {props.locality && <li className="inline-block"><span className="p-locality">{props.locality}</span>,</li>}
                    {props.region && <li className="inline-block ml-1"><abbr className="p-region" title={props.region?.title}>{props.region?.abbr}</abbr>,</li>}
                    {props.country && <li className="inline-block ml-1"><span className="p-country-name">{props.country}</span></li>}
                </ul>
                {props.category && <div className="p-category">{props.category}</div>}
                {props.gpgKey && <div className="u-key">{props.gpgKey}</div>}
            </div>
        </div>
    </div>
);

export default HCard;