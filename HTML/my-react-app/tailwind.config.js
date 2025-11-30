module.exports = {
    theme: {
        extend: {
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'progress-bar': 'progress-bar 5s linear',
            },
            keyframes: {
                'fade-in': {
                    from: {
                        opacity: '0',
                        transform: 'translate(-50%, -20px)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translate(-50%, 0)'
                    }
                },
                'progress-bar': {
                    from: {
                        width: '100%'
                    },
                    to: {
                        width: '0%'
                    }
                },
                
            }
        }
    }
}