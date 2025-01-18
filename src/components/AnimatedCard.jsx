import { motion } from 'framer-motion';

export function AnimatedCard({ children, className }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
            {children}
        </motion.div>
    );
}

export function AnimatedMetricCard({ icon: Icon, title, value, change, color }) {
    return (
        <AnimatedCard className={`relative overflow-hidden rounded-xl bg-gradient-to-br shadow-lg`}>
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.5 }}
            />
            <div className="relative p-6">
                <motion.div
                    className="flex items-center justify-between"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Icon className="h-8 w-8 text-white opacity-80" />
                    <motion.span
                        className="inline-flex items-center rounded-md bg-white/20 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20"
                        whileHover={{ scale: 1.1 }}
                    >
                        {change}
                    </motion.span>
                </motion.div>
                <motion.p
                    className="mt-4 text-2xl font-semibold text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {value}
                </motion.p>
                <motion.p
                    className="mt-2 text-sm text-white/80"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {title}
                </motion.p>
            </div>
        </AnimatedCard>
    );
}