import React, { FunctionComponent } from 'react';

interface Props {
    icon: string;
}

export const Icon: FunctionComponent<Props> =({ icon }) => (
    <svg width="100%" height="100%">
        <use xlinkHref={`#${icon}`} />
    </svg>
);
