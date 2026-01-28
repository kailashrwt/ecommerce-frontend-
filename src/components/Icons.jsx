import React from "react";

export const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
);


export const ShopIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M3 9h18l-1 11H4L3 9Zm2-6h14l1 4H4l1-4Z" />
    </svg>
);

export const GirlIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M12 2.5c-2.2 0-4 1.9-4 4.2s1.8 4.1 4 4.1 4-1.8 4-4.1-1.8-4.2-4-4.2z" />
        <path d="M7.5 14c-1.7 1.1-2.5 2.7-2.5 4.5v1h14v-1c0-1.8-.8-3.4-2.5-4.5-1.3-.9-3-.5-4-.5s-2.7-.4-4 .5z" />
        <path d="M17 4s2 .4 2.8 2S19 10 17.8 10c0 0 .4-2.2-.4-3.2C16.8 5.8 17 4 17 4z" />
    </svg>
);

export const SimpleSearchIcon = ({ className = "" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
    );
};

export const LinkIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1" />
        <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1" />
    </svg>
);

export const FlashIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
);

export const PaymentIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="M14 14h3M14 17h2.5M14 11h3M14 11c1.5 0 2.5-1 2.5-2H14" />
    </svg>
);

export const SimpleMagic = ({ className = "" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="30" width="22" height="4" rx="1" transform="rotate(-40 30 30)" />
        <path d="M12 18 L16 22 L20 18 L16 14 Z" fill="currentColor" />
        <path d="M18 8 L20 14 L26 14 L21 17 L23 23 L18 19 L13 23 L15 17 L10 14 L16 14 Z" fill="currentColor" opacity="0.9" />
        <path d="M48 8 L50 12 L52 8 L50 6 Z" fill="currentColor" opacity="0.95" />
        <circle cx="44" cy="20" r="1.6" fill="currentColor" />
    </svg>
);


export const PremiumDiamondLogo = ({ className = "" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 24L32 8L48 24L32 56L16 24Z" />
            <path d="M32 8L24 24L32 56L40 24L32 8Z" />
        </svg>
    );
};



export const HoopsIcon = ({ className = "w-6 h-6", title = "Hoops" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        {title && <title>{title}</title>}
        <circle cx="12" cy="12" r="7" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
);

export const EarringsIcon = ({ className = "w-6 h-6", title = "Earrings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M12 2a2 2 0 0 0-2 2v6a4 4 0 1 0 4 0V4a2 2 0 0 0-2-2zM8 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
);

export const NecklaceIcon = ({ className = "w-6 h-6", title = "Necklace" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <path d="M4 10s4-6 8-6 8 6 8 6" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
);

export const BraceletsIcon = ({ className = "w-6 h-6", title = "Bracelet" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
    </svg>
);

export const RingsIcon = ({ className = "w-6 h-6", title = "Rings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M6 14c1.5-3 6-6 10-4 1 0 2 1 2 2 0 2-3 4-6 4-3 0-5-1-6-2zM4 10c1-2 5-6 10-6" />
    </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", title = "Search" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <circle cx="11" cy="11" r="5" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6", title = "Settings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
        {title && <title>{title}</title>}
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        <path d="M19.4 15a7.9 7.9 0 0 0 .1-1 7.9 7.9 0 0 0-.1-1l2.1-1.6-2-3.5-2.5.6a8 8 0 0 0-1.8-1l-.4-2.6H9.6l-.4 2.6a7.9 7.9 0 0 0-1.8 1L4.9 7.9 2.9 11.4l2.1 1.6a7.9 7.9 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-.6c.5.4 1 .8 1.6 1.1l.4 2.6h4.8l.4-2.6c.6-.2 1.2-.5 1.8-1l2.5.6 2-3.5-2.1-1.6z" />
    </svg>
);

export const DayThemeIcon = ({ className = "w-6 h-6", title = "Light theme" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

export const NightThemeIcon = ({ className = "w-6 h-6", title = "Dark theme" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
);

export const LoginIcon = ({ className = "w-6 h-6", title = "Login" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4" strokeLinecap="round" />
        <path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12H3" strokeLinecap="round" />
    </svg>
);

export const AvatarIcon = ({ className = "w-6 h-6", title = "Avatar" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <circle cx="12" cy="8" r="3" />
        <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
);

export const CartIcon = ({ className = "w-6 h-6", title = "Cart" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <path d="M3 3h2l1.4 9h11.6l2-6H8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
);

export const IceCreamIcon = ({ className = "w-6 h-6", title = "Ice cream" }) => (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <path d="M32 6c6 0 10 4 10 8 0 6-8 10-10 10s-10-4-10-10c0-4 4-8 10-8z" fill="currentColor" />
        <path d="M22 28c0 6 10 10 10 10s10-4 10-10" stroke="currentColor" strokeLinecap="round" />
        <path d="M26 42c1.5 3 4.5 10 6 12 1.5-2 5-9 6-12" stroke="currentColor" strokeLinecap="round" />
        <path d="M20 52h24l-6 8H26l-6-8z" fill="currentColor" />
    </svg>
);

export const SaleIcon = ({ className = "w-6 h-6", title = "Sale" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M3 12l8-8 10 10-8 8L3 12zM9 9h.01" />
    </svg>
);

export const GiftIcon = ({ className = "w-6 h-6", title = "Gift" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M12 20V7" strokeLinecap="round" />
        <path d="M12 7s3-4 6-4c1.5 0 3 1 3 3 0 3-3 5-3 5" strokeLinecap="round" />
        <path d="M12 7s-3-4-6-4c-1.5 0-3 1-3 3 0 3 3 5 3 5" strokeLinecap="round" />
    </svg>
);

export const FireGlowIcon = ({ className = "w-6 h-6", title = "Fire" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        {title && <title>{title}</title>}
        <path d="M12 2c2 3 4 5 4 8.5 0 3-2 5.5-4 5.5s-4-2.5-4-5.5c0-1.8.8-3.5 2-4.8-.5 3 .5 4.3 2 5 1.8-2 1.5-4.5 0-8.2Z" />
        <path
            d="M8 13c-2 2-3 3.5-3 6 0 3 3 5 7 5s7-2 7-5c0-2.5-1-4-3-6-.4 2-1.7 3.5-4 3.5S8.4 15 8 13Z"
            opacity=".6"
        />
    </svg>
);

export const DashboardLayoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="currentColor"
    >
        <rect x="2" y="3" width="6" height="18" rx="1.2" />
        <rect x="10" y="3" width="12" height="5" rx="1.2" />
        <rect x="10" y="10" width="12" height="5" rx="1.2" />
        <rect x="10" y="17" width="12" height="4" rx="1.2" />
    </svg>
);

export const ClockIcon = ({ className = "w-6 h-6", color = "currentColor" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
};

export const FireIcon = ({ className = "w-6 h-6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
        </svg>
    );
};

export const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
)

// ShoppingCart Icon
export const ShoppingCartIcon = ({ className = "w-6 h-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

// MinusIcon.js - 1 line version
export const MinusIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
);

export const PlusIcon = ({ c = "w-6 h-6" }) => (
    <svg className={c} viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" d="M12 4v16M4 12h16" />
    </svg>
);

export const ShoppingBagIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zm-9-1a2 2 0 014 0v1h-4V6zm9 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z" />
    </svg>
);

export const TrashIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const GiftUnder2000Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift under ₹2000"} />;
export const Gift2100To3500Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift ₹2100–₹3500"} />;
export const Gift3600To5000Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift ₹3600–₹5000"} />;

export const FlavorBadge = ({ label = "Flavor", className = "w-20 h-6", bg = null }) => {
    return (
        <svg viewBox="0 0 120 28" className={className} aria-hidden="false" role="img">
            <title>{label}</title>
            <rect x="0.5" y="0.5" width="119" height="27" rx="6" fill={bg ?? "none"} stroke="currentColor" strokeWidth="1" />
            <text x="60" y="18" fontSize="12" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle">
                {label}
            </text>
        </svg>
    );
};

// Add these to your existing Icons.jsx file

export const HeartIcon = ({ className = "w-6 h-6", filled = false }) => (
    <svg
        className={className}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
    </svg>
);

export const EyeIcon = ({ className = "w-6 h-6" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
    </svg>
);

export const FilterIcon = ({ className = "w-6 h-6" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
    </svg>
);

export const SortIcon = ({ className = "w-6 h-6" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
        />
    </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export const HeartFilledIcon = (props) => {
    const { size = 24, color = "currentColor", ...rest } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
};

export const Wristwatch = ({ className = "w-6 h-6", color = "currentColor" }) => (
    <svg
        className={className}
        fill="none"
        stroke={color}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

// In your icon file (e.g., icons.js or icons/index.js)
export const Pinterest = ({ size = 24, color = "currentColor", ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.68c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.84c.85.004 1.71.115 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.16.57.68.47C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
);



// In your Icons.jsx file
export const StarIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const Sorbet = (props) => <FlavorBadge label="Sorbet" {...props} />;
export const CitrusChic = (props) => <FlavorBadge label="CitrusChic" {...props} />;
export const BerryMinimum = (props) => <FlavorBadge label="BerryMinimum" {...props} />;
export const ClassicVanilla = (props) => <FlavorBadge label="ClassicVanilla" {...props} />;
export const LuxuriusLime = (props) => <FlavorBadge label="LuxuriusLime" {...props} />;
export const SorbetSensation = (props) => <FlavorBadge label="SorbetSensation" {...props} />;
export const SummerFling = (props) => <FlavorBadge label="SummerFling" {...props} />;
export const LilScoopsies = (props) => <FlavorBadge label="LilScoopsies" {...props} />;
export const SassySorbet = (props) => <FlavorBadge label="SassySorbet" {...props} />;
export const GiftTag = (props) => <FlavorBadge label="Gift" {...props} />;
export const Under2000 = (props) => <FlavorBadge label="Under ₹2000" {...props} />;
export const Range2100To3500 = (props) => <FlavorBadge label="₹2100–₹3500" {...props} />;
export const Range3600To5000 = (props) => <FlavorBadge label="₹3600–₹5000" {...props} />;

export default {
    ShopIcon,
    HoopsIcon,
    EarringsIcon,
    NecklaceIcon,
    BraceletsIcon,
    RingsIcon,
    SearchIcon,
    SettingsIcon,
    DayThemeIcon,
    NightThemeIcon,
    LoginIcon,
    AvatarIcon,
    CartIcon,
    IceCreamIcon,
    SaleIcon,
    GiftIcon,
    GiftUnder2000Icon,
    Gift2100To3500Icon,
    Gift3600To5000Icon,
    FlavorBadge,
    Sorbet,
    CitrusChic,
    BerryMinimum,
    ClassicVanilla,
    LuxuriusLime,
    SorbetSensation,
    SummerFling,
    LilScoopsies,
    SassySorbet,
    GiftTag,
    Under2000,
    Range2100To3500,
    Range3600To5000,
};
