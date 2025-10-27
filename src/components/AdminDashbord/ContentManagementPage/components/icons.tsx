
import React from 'react';

const iconProps = {
    className: "w-6 h-6",
    strokeWidth: 1.5,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor"
};

const smallIconProps = {
    className: "w-4 h-4",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor"
};

export const BookIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);

export const LessonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-.07.004c-.03.001-.06.002-.09.003l-.07.004c-.03.001-.06.002-.09.003m15.482 0l.07.004c.03.001.06.002.09.003l.07.004c.03.001.06.002.09.003" /></svg>
);

export const FlashcardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375V6.375m0 12a1.5 1.5 0 01-1.5-1.5V6.375a1.5 1.5 0 113 0v10.5a1.5 1.5 0 01-1.5 1.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.375 12.375h5.25" /></svg>
);

export const ViewIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const actionIconProps = {
    className: "w-5 h-5",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor"
};

export const EyeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...actionIconProps}><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const PencilIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...actionIconProps}><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
);

export const BlockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" {...actionIconProps}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
);

export const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" {...actionIconProps}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

export const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path><polyline points="7 9 12 4 17 9"></polyline><line x1="12" y1="4" x2="12" y2="16"></line></svg>
)

export const VocabularyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M10 3h8v12h-8zM2 9h4v12H2zM4 9V7a2 2 0 0 1 2-2h2" /></svg>;
export const GrammarIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l.79-.79" /></svg>;
export const ExerciseIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" /><path d="M15 2v5h5" /><path d="M10 16s.8-1 2-1 2 1 2 1" /><path d="M9 12h.01" /><path d="M15 12h.01" /></svg>;
export const MediaIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" {...smallIconProps}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M7 10.5v3" /><path d="M12.5 8.5v7" /><path d="M17.5 12.5v-2" /><path d="M2 17h20" /></svg>;

