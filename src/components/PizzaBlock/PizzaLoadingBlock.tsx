import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={1}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#cccccc"
        foregroundColor="#ffffff"
    >
        <circle
            cx="142"
            cy="124"
            r="124"
        />
        <rect
            x="0"
            y="261"
            rx="8"
            ry="8"
            width="280"
            height="30"
        />
        <rect
            x="0"
            y="313"
            rx="8"
            ry="8"
            width="280"
            height="80"
        />
        <rect
            x="2"
            y="415"
            rx="8"
            ry="8"
            width="85"
            height="30"
        />
        <rect
            x="121"
            y="403"
            rx="23"
            ry="23"
            width="152"
            height="50"
        />
    </ContentLoader>
);

export default Skeleton;
