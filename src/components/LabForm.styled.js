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

export const ModalFormSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 8px;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(221, 230, 237, 0.4);
        border-radius: 3px;
        
        &:hover {
            background: rgba(221, 230, 237, 0.6);
        }
    }
`

export const ShakerVisualizationContainer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
    position: sticky;
    top: 0;
    align-self: flex-start;
    
    @media (max-width: 768px) {
        width: 100%;
        position: relative;
    }
`

export const ShakerSVGWrapper = styled.div`
    position: relative;
    width: 200px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 10px;
`

export const ShakerSVG = styled.svg`
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
    
    @keyframes fillUp {
        from {
            transform: scaleY(0);
        }
        to {
            transform: scaleY(1);
        }
    }
    
    .liquid-layer-container {
        transform-origin: bottom;
    }
`

export const ShakerBody = styled.path`
    fill: #F0F0F0;
    stroke: #B0B0B0;
    stroke-width: 2.5;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`

export const ShakerTop = styled.path`
    fill: #FFFFFF;
    stroke: #B0B0B0;
    stroke-width: 2.5;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`

export const ShakerLiquidContainer = styled.g`
    clip-path: url(#shaker-clip);
`

export const ShakerInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const ShakerInfoTitle = styled.h3`
    margin: 0;
    color: #DDE6ED;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

export const IngredientRatioList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`

export const IngredientRatioItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    font-size: 14px;
    color: #27374D;
    position: relative;
`

export const ColorIndicator = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: ${props => props.color || '#transparent'};
    border: 2px solid rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
`

export const RatioText = styled.span`
    flex: 1;
    font-weight: 500;
`

export const PercentageText = styled.span`
    font-weight: 700;
    color: #526D82;
    min-width: 50px;
    text-align: right;
`

