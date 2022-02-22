import {ReactNode, ReactPortal, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import {getFocusableElements} from '../../../utils/utils';
import {FOCUS_TIMEOUT, KeyAttributeValue, TRANSITION_DELAY} from '../../../common/constants';

type ModalProps = {
  isModalOpen: boolean;
  onModalOpenSelect: (isOpen: boolean) => void;
  className?: string;
  children?: ReactNode;
}

function Modal({isModalOpen, onModalOpenSelect, className = '', children}: ModalProps): ReactPortal {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [scrollGapSize, setScrollGapSize] = useState<number>(0);
  const [lastActiveElement, setLastActiveElement] = useState<HTMLElement | null>(null);

  const handleModalClose = () => onModalOpenSelect(false);

  const handleOverlayClick = () => onModalOpenSelect(false);

  const handleEscKeydown = useCallback((evt: {code: string;}) => {
    if (evt.code === KeyAttributeValue.Escape) {
      onModalOpenSelect(false);
    }
  }, [onModalOpenSelect]);

  const handleTransitionEnter = () => {
    setScrollGapSize(window.innerWidth - document.body.clientWidth);
    setLastActiveElement(document.activeElement as HTMLElement);
  };

  const handleTransitionEntering = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollGapSize}px`;
  };

  const handleTransitionEntered = () => {
    if (modalRef.current) {
      const focusableElements = getFocusableElements(modalRef.current);
      const firstElement = focusableElements[0] as HTMLElement;

      setTimeout(() => {firstElement.focus();}, FOCUS_TIMEOUT);
    }
  };

  const handleTransitionExited = () => {
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = '0px';

    if (lastActiveElement) {
      setTimeout(() => {lastActiveElement.focus();}, FOCUS_TIMEOUT);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [handleEscKeydown, isModalOpen]);

  return createPortal(
    <CSSTransition
      nodeRef={modalRef}
      in={isModalOpen}
      onEnter={handleTransitionEnter}
      onEntering={handleTransitionEntering}
      onEntered={handleTransitionEntered}
      onExited={handleTransitionExited}
      timeout={{enter: 0, exit: TRANSITION_DELAY}}
      classNames={{enterDone: 'is-active'}}
      mountOnEnter
      unmountOnExit
    >
      <div
        ref={modalRef}
        className={`modal ${className}`}
        data-testid="modal"
      >
        <div className="modal__wrapper">
          <div
            onClick={handleOverlayClick}
            className="modal__overlay"
          />
          <FocusLock>
            <div className="modal__content">
              {children}
              <button
                onClick={handleModalClose}
                className="modal__close-btn button-cross"
                type="button"
                aria-label="Закрыть"
              >
                <span className="button-cross__icon" />
                <span className="modal__close-btn-interactive-area" />
              </button>
            </div>
          </FocusLock>
        </div>
      </div>
    </CSSTransition>,
    document.body,
  );
}

export default Modal;
