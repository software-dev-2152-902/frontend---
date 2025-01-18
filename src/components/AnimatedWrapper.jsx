import { motion } from 'framer-motion';

const fadeIn = (direction = 'up', delay = 0) => ({
    hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.25,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
        }
    }
});

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        }
    }
};

export function AnimatedWrapper({ children, className, delay = 0, direction = 'up' }) {
    return (
        <motion.div
            variants={fadeIn(direction, delay)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function AnimatedStaggerWrapper({ children, className }) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}