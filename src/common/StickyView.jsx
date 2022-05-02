import { useContext, useEffect, useRef, useState } from 'react';
import ScrollContext from './ScrollContext';
import './stickyView.scss';

export default function StickyView(props) {
    const { height, children } = props;

    const elRef = useRef();
    const { scrollingElement } = useContext(ScrollContext);
    const [proportion, setProportion] = useState(null);

    function onScroll(ref) {
        let refBoundTop = ref.getBoundingClientRect().top
        let offsetTopRef = ref.offsetTop
        let refHeight = ref.clientHeight
        let scrollingElementHeight = scrollingElement.clientHeight / scrollingElement.childNodes.length
        let proportion
        if (refBoundTop > 0) {
            proportion = (refBoundTop / scrollingElementHeight ) * (-1)
            setProportion(proportion)
        } else {
            if (offsetTopRef === 0) {
                setProportion(0)
            } else {
                proportion = (offsetTopRef + refHeight + 101) / (scrollingElementHeight)
                setProportion(proportion)
            }
        }
    }

    useEffect(() => {
        if (scrollingElement) {
            document.addEventListener('scroll', (e) => onScroll(elRef.current))
            onScroll(elRef.current)
        }
    }, [scrollingElement]) /// performance issue

    return (
        <div className="sticky-view" style={{ height }}>
            <div
                className="sticky-view-sticky"
                ref={elRef}
                // style={{ height: scrollingElement?.clientHeight }}
                style={{ height: 500 }}
            >
                {children(proportion)}
            </div>
        </div>
    );
}
