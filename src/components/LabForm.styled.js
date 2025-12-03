import styled from 'styled-components'

export const ShakerAnimationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 200px;
    height: 200px;
    background: rgba(128, 128, 128, 0.9);
    border-radius: 50%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`

export const ShakerAnimationIcon = styled.img`
    width: 180px;
    height: 180px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.95;

    @keyframes shakeFirst {
        0%, 100% {
            transform: translateY(0);
        }
        25% {
            transform: translateY(-15px);
        }
        75% {
            transform: translateY(15px);
        }
    }

    @keyframes flip {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(180deg);
        }
    }

    @keyframes shakeSecond {
        0%, 100% {
            transform: rotate(180deg) translateY(0);
        }
        25% {
            transform: rotate(180deg) translateY(-15px);
        }
        75% {
            transform: rotate(180deg) translateY(15px);
        }
    }

    &.shake-first {
        animation: shakeFirst 1s ease-in-out;
    }

    &.flip {
        animation: flip 0.5s ease-in-out forwards;
    }

    &.shake-second {
        animation: shakeSecond 1s ease-in-out;
    }
`

