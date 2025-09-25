import { motion } from 'framer-motion';

export const DoodlePencil = ({ className = "w-16 h-16" }: { className?: string }) => (
    <motion.svg
        className={`${className} doodle-icon`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
    >
        <motion.path
            d="M15 85 L25 75 L75 25 L85 35 L35 85 Z"
            stroke="#000000"
            strokeWidth="3"
            fill="#87ceeb"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.path
            d="M70 30 L80 40"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
        />
        <motion.circle
            cx="82"
            cy="18"
            r="8"
            fill="#fef08a"
            stroke="#000000"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2 }}
        />
    </motion.svg>
);

export const DoodleThoughtBubble = ({ className = "w-16 h-16" }: { className?: string }) => (
    <motion.svg
        className={`${className} doodle-icon`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.ellipse
            cx="50"
            cy="35"
            rx="35"
            ry="25"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.circle
            cx="25"
            cy="65"
            r="8"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
        />
        <motion.circle
            cx="15"
            cy="78"
            r="4"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
        />
        <motion.text
            x="50"
            y="42"
            textAnchor="middle"
            className="text-lg font-bold"
            fill="#1e3a8a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        >
            ?
        </motion.text>
    </motion.svg>
);

export const DoodleTrophy = ({ className = "w-16 h-16" }: { className?: string }) => (
    <motion.svg
        className={`${className} doodle-icon`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.path
            d="M30 20 L70 20 L65 50 L35 50 Z"
            fill="#fef08a"
            stroke="#000000"
            strokeWidth="3"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.rect
            x="45"
            y="50"
            width="10"
            height="20"
            fill="#87ceeb"
            stroke="#000000"
            strokeWidth="2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.rect
            x="35"
            y="70"
            width="30"
            height="8"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="2"
            rx="4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.path
            d="M20 25 Q15 30 20 35 L30 30"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
            d="M80 25 Q85 30 80 35 L70 30"
            fill="#bfdbfe"
            stroke="#000000"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
        />
    </motion.svg>
);

export const SketchArrow = ({ className = "w-8 h-8", direction = "right" }: { className?: string; direction?: "right" | "down" }) => (
    <motion.svg
        className={`${className} sketch-arrow`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: direction === "down" ? "rotate(90deg)" : "none"
        }}
    >
        <motion.path
            d="M10 50 Q40 45 60 50 Q40 55 60 50"
            stroke="#1e3a8a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
            d="M55 40 L70 50 L55 60"
            stroke="#1e3a8a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
        />
    </motion.svg>
);