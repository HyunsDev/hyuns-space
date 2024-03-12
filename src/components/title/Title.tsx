export function Title({
  className,
  fill = "hsl(var(--foreground))",
  scale = 1,
}: {
  className?: string;
  fill?: string;
  scale?: number;
}) {
  return (
    <svg
      width="54"
      height="20"
      viewBox="0 0 54 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <path
        d="M12.2969 11.0625H9.73438V0.046875H12.2969V11.0625ZM10.6562 5.51562H8.1875V3.45312H10.6562V5.51562ZM10.6562 8.60938H8.1875V6.57812H10.6562V8.60938ZM7.92188 3.375H0V1.375H7.92188V3.375ZM4.07812 3.67188C4.74479 3.67188 5.34635 3.79688 5.88281 4.04688C6.41927 4.29688 6.83854 4.64323 7.14062 5.08594C7.44271 5.52865 7.59375 6.02604 7.59375 6.57812C7.59375 7.13021 7.44271 7.6276 7.14062 8.07031C6.83854 8.51302 6.41927 8.85938 5.88281 9.10938C5.34635 9.35938 4.74479 9.48438 4.07812 9.48438C3.42188 9.48438 2.83073 9.35938 2.30469 9.10938C1.77865 8.85938 1.36458 8.51302 1.0625 8.07031C0.760417 7.6276 0.609375 7.13021 0.609375 6.57812C0.609375 6.03646 0.760417 5.54167 1.0625 5.09375C1.36458 4.64583 1.78125 4.29688 2.3125 4.04688C2.84375 3.79688 3.43229 3.67188 4.07812 3.67188ZM4.07812 5.67188C3.86979 5.67188 3.6849 5.70312 3.52344 5.76562C3.36198 5.82812 3.23438 5.92708 3.14062 6.0625C3.04688 6.19792 3 6.36979 3 6.57812C3 6.79688 3.04688 6.97656 3.14062 7.11719C3.23438 7.25781 3.35938 7.36198 3.51562 7.42969C3.67188 7.4974 3.85938 7.53125 4.07812 7.53125C4.29688 7.53125 4.48698 7.4974 4.64844 7.42969C4.8099 7.36198 4.9375 7.25781 5.03125 7.11719C5.125 6.97656 5.17188 6.79688 5.17188 6.57812C5.17188 6.36979 5.125 6.19792 5.03125 6.0625C4.9375 5.92708 4.8099 5.82812 4.64844 5.76562C4.48698 5.70312 4.29688 5.67188 4.07812 5.67188ZM5.39062 2.59375H2.8125V0H5.39062V2.59375ZM12.5938 14.3125H2.45312V12.25H12.5938V14.3125ZM5.07812 13.1875H2.45312V10.1406H5.07812V13.1875Z"
        fill={fill}
      />
      <path
        d="M27.2188 9.60938H14V7.53125H27.2188V9.60938ZM21.8438 14.0938H19.2812V8.875H21.8438V14.0938ZM20.5625 0C21.6146 0 22.5495 0.138021 23.3672 0.414062C24.1849 0.690104 24.8229 1.08073 25.2812 1.58594C25.7396 2.09115 25.9688 2.68229 25.9688 3.35938C25.9688 4.01562 25.7396 4.59115 25.2812 5.08594C24.8229 5.58073 24.1849 5.96354 23.3672 6.23438C22.5495 6.50521 21.6146 6.64062 20.5625 6.64062C19.5208 6.64062 18.5911 6.50521 17.7734 6.23438C16.9557 5.96354 16.3203 5.58073 15.8672 5.08594C15.4141 4.59115 15.1875 4.01562 15.1875 3.35938C15.1875 2.68229 15.4141 2.09115 15.8672 1.58594C16.3203 1.08073 16.9557 0.690104 17.7734 0.414062C18.5911 0.138021 19.5208 0 20.5625 0ZM20.5625 2.04688C19.9896 2.04688 19.5 2.09375 19.0938 2.1875C18.6875 2.28125 18.3802 2.42708 18.1719 2.625C17.9635 2.82292 17.8594 3.06771 17.8594 3.35938C17.8594 3.64062 17.9635 3.875 18.1719 4.0625C18.3802 4.25 18.6875 4.38802 19.0938 4.47656C19.5 4.5651 19.9896 4.61458 20.5625 4.625C21.1562 4.61458 21.6536 4.5651 22.0547 4.47656C22.4557 4.38802 22.763 4.25 22.9766 4.0625C23.1901 3.875 23.2969 3.64062 23.2969 3.35938C23.2969 3.06771 23.1901 2.82292 22.9766 2.625C22.763 2.42708 22.4531 2.28125 22.0469 2.1875C21.6406 2.09375 21.1458 2.04688 20.5625 2.04688Z"
        fill={fill}
      />
      <path
        d="M33.4531 14.3438C34.526 14.3438 35.4531 14.4531 36.2344 14.6719C37.0156 14.8906 37.6198 15.2083 38.0469 15.625C38.474 16.0417 38.6875 16.5469 38.6875 17.1406C38.6875 17.7135 38.474 18.2083 38.0469 18.625C37.6198 19.0417 37.013 19.362 36.2266 19.5859C35.4401 19.8099 34.5156 19.9219 33.4531 19.9219C32.4115 19.9219 31.4974 19.8099 30.7109 19.5859C29.9245 19.362 29.3151 19.0417 28.8828 18.625C28.4505 18.2083 28.2344 17.7135 28.2344 17.1406C28.2344 16.5573 28.4479 16.0547 28.875 15.6328C29.3021 15.2109 29.9089 14.8906 30.6953 14.6719C31.4818 14.4531 32.401 14.3438 33.4531 14.3438ZM33.4531 16.2344C32.8594 16.2344 32.3698 16.2656 31.9844 16.3281C31.599 16.3906 31.3073 16.487 31.1094 16.6172C30.9115 16.7474 30.8125 16.9219 30.8125 17.1406C30.8125 17.349 30.9115 17.513 31.1094 17.6328C31.3073 17.7526 31.599 17.8411 31.9844 17.8984C32.3698 17.9557 32.8594 17.9844 33.4531 17.9844C34.0573 17.9844 34.5547 17.9557 34.9453 17.8984C35.3359 17.8411 35.6302 17.75 35.8281 17.625C36.026 17.5 36.125 17.3385 36.125 17.1406C36.125 16.9219 36.026 16.7474 35.8281 16.6172C35.6302 16.487 35.3359 16.3906 34.9453 16.3281C34.5547 16.2656 34.0573 16.2344 33.4531 16.2344ZM37.5469 8H28.4219V6H37.5469V8ZM40.125 13.75H27V11.6719H40.125V13.75ZM34.0938 12.2031H31.5312V9.32812H34.0938V12.2031ZM38.6562 7.15625C38.6562 7.9375 38.6328 8.61979 38.5859 9.20312C38.5391 9.78646 38.4219 10.4062 38.2344 11.0625L35.6875 10.8281C35.8438 10.1823 35.9427 9.60677 35.9844 9.10156C36.026 8.59635 36.0521 7.98958 36.0625 7.28125V7.15625V6H38.6562V7.15625Z"
        fill={fill}
      />
      <path
        d="M51.7969 10.2188H49.1719V0H51.7969V10.2188ZM53.5781 5.92188H51.0781V3.8125H53.5781V5.92188ZM47.8125 1.0625C47.8125 2.41667 47.5599 3.61719 47.0547 4.66406C46.5495 5.71094 45.7969 6.59896 44.7969 7.32812C43.7969 8.05729 42.5521 8.61979 41.0625 9.01562L40 6.98438C41.1458 6.69271 42.0938 6.3151 42.8438 5.85156C43.5938 5.38802 44.1458 4.86198 44.5 4.27344C44.8542 3.6849 45.0312 3.05729 45.0312 2.39062V1.0625H47.8125ZM46.5 3.15625H40.6562V1.0625H46.5V3.15625ZM52.1562 14.2969H42.125V12.2344H52.1562V14.2969ZM44.75 13.2031H42.125V9.17188H44.75V13.2031Z"
        fill={fill}
      />
    </svg>
  );
}
