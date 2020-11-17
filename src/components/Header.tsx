import { FC, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { pageSettings } from '../settings';

export interface HeaderState {
    menuVisible: boolean;
}

export interface HeaderProps {
    pages?: {
        title: string;
        href: string;
    }[];
}

export const BurgerIcon: FC = () => (
    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

export const Header: FC<HeaderProps> = (props) => {
    const [menuVisible, setMenuVisible] = useState(false);
    return (
        <div className="bg-teal-500">
            <nav className="flex items-center justify-between flex-wrap container mx-auto py-6 px-4">
                <Link href="/">
                    <a>
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="font-semibold text-xl tracking-tight font-mono">
                                [{pageSettings.title} ~]$ <span className="x-logo-ticker">█</span>
                            </span>
                        </div>
                    </a>
                </Link>
                <div className="block lg:hidden">
                    <button
                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                        onClick={() => setMenuVisible(!menuVisible)}
                    >
                        <BurgerIcon />
                    </button>
                </div>
                <div
                    className={cx('w-full block flex-grow lg:flex lg:items-center lg:w-auto', { hidden: !menuVisible })}
                >
                    <div className="lg:flex-grow">
                        {props.pages.map((item) => (
                            <Link href={item.href} key={item.href}>
                                <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

Header.defaultProps = {
    pages: [
        { title: 'Blog', href: '/' },
        { title: 'Tags', href: '/tags' },
        { title: 'About me', href: '/pages/about-me' },
    ],
};

export default Header;
