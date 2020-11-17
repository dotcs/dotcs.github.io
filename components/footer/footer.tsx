import { FC } from 'react';
import Link from 'next/link';

export const Footer: FC = () => (
    <div className="p-4 mt-8 bg-white text-center antialiased text text-gray-700 border-t-2">
        <div className="container mx-auto">
            <p>
                All work licensed under 
                <Link href="/pages/[slug]" as="/pages/license-information">
                    <a className="mx-1 text-xl align-middle">
                        <i className="lab la-creative-commons" title="Creative commons" /> 
                        <i className="lab la-creative-commons-by" title="Attribution" />
                        <i className="lab la-creative-commons-sa" title="Share alike" />
                    </a>
                </Link>
                unless otherwise stated.
            </p>
            <ul className="flex flex-col mt-4 sm:mt-0 sm:flex-row justify-center">
                <li className="px-2 mb-2 sm:mb-0">
                    <Link href="/pages/[slug]" as="/pages/license-information">
                        <a className="x-link">License Info</a>
                    </Link>
                </li>
                <li className="px-2 mb-2 sm:mb-0">
                    <Link href="/pages/[slug]" as="/pages/privacy">
                        <a className="x-link">Privacy</a>
                    </Link>
                </li>
                <li className="px-2 mb-2 sm:mb-0">
                    <Link href="/pages/[slug]" as="/pages/imprint">
                        <a className="x-link">Imprint</a>
                    </Link>
                </li>
                {/* <li className="px-2 mb-2 sm:mb-0">
                    <Link href="/pages/[slug]" as="/pages/sponsoring">
                        <a className="x-link">Sponsor me</a>
                    </Link>
                </li> */}
                {/* <li className="px-2 mb-2 sm:mb-0">
                    <Link href="/pages/[slug]" as="/pages/feeds">
                        <a className="x-link">
                            <i className="las la-rss"></i>
                            Feeds
                        </a>
                    </Link>
                </li> */}
            </ul>
        </div>
    </div>
);
