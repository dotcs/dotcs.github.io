import { FC, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';

export interface HeaderState {
    menuVisible: boolean;
}

export const Header: FC<{}> = props => {
    const [menuVisible, setMenuVisible] = useState(false);
    return (
        <div className="bg-teal-500">
            <nav className="flex items-center justify-between flex-wrap container mx-auto py-6 px-4">
                <Link href="/">
                    <a>
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="font-semibold text-xl tracking-tight font-mono">
                                [dotcs.me ~]$ <span className="x-logo-ticker">█</span>
                            </span>
                        </div>
                    </a>
                </Link>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" onClick={() => setMenuVisible(!menuVisible)}>
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className={cx('w-full', 'block', 'flex-grow', 'lg:flex', 'lg:items-center', 'lg:w-auto', {hidden: !menuVisible})}>
                    <div className="text-sm lg:flex-grow">
                        <Link href="/">
                            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Blog</a>
                        </Link>
                        {/* <Link href="/pages/[slug]" as="/pages/blogroll">
                    <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Blogroll</a>
                </Link> */}
                        <Link href="/tags">
                            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Tags</a>
                        </Link>
                        <Link href="/pages/[slug]" as="/pages/about-me">
                            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">About me</a>
                        </Link>
                    </div>
                    {/* <div>
                        <Link href="/pages/[slug]" as="/pages/sponsoring">
                            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sponsor me</a>
                        </Link>
                    </div> */}
                </div>
            </nav>
        </div>
    );
};
