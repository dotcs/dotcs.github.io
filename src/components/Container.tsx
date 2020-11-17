import { FC } from 'react';
import cx from 'classnames';

export interface ContainerProps {
    className?: string;
}

const Container: FC<ContainerProps> = (props) => (
    <div className={cx('container mx-auto', props.className)}>{props.children}</div>
);

export default Container;
