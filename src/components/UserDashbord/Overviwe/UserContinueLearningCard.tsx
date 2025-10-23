import React from 'react';

// 1. Define the props interface for type safety
interface ContinueLearningCardProps {
  /** The main title of the card. */
  title: string;
  /** The descriptive text indicating progress or a goal. */
  goalText: string;
  /** The text displayed on the action button. */
  buttonText: string;
  /** Optional function to call when the button is clicked. */
  onButtonClick?: () => void;
  img:any
}

/**
 * A card component designed to encourage users to continue learning or reach a goal.
 */
const UserContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  title,
  goalText,
  buttonText,
  onButtonClick,img
}) => {
  return (
    <div className=" p-8 bg-white border border-[#BBD2FF] rounded-xl shadow-lg flex items-center justify-between  mx-auto bg-[linear-gradient(180deg,rgba(202,210,244,0.10)_0%,rgba(102,126,234,0.10)_100%)] "  >
      {/* Content Section (Text and Button) */}
      <div className="flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-bold text-[#333] mb-2">
          {title}
        </h2>
        {/* Goal/Progress Text */}
        <p className="text-xl text-[#585858] mb-4">
          {goalText}
        </p>
        {/* Action Button */}
        <button
          onClick={onButtonClick}
          className="bg-blue-600 cursor-pointer mt-1 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-lg shadow-md transition duration-200 w-fit"
        >
          {buttonText}
        </button>
      </div>

       <div className="ml-4">
       
        <div className=" mr-8  relative">
      
           <img className='w-25 h-25' src={img} alt="" />
      
          
            
           
           
        </div>
      </div>
    </div>
  );
};

export default UserContinueLearningCard;