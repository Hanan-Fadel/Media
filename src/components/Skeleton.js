import classNames from 'classnames';


function Skeleton({times, className}) { //times, a number for how many gray boxes we want to show
    const outerClassNames = classNames(
        'relative',
        'overflow-hidden',
        'bg-gray-200',
        'rounded',
        'mb-2.5',
        className //to set the height and widths of these divs 
    );

    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200'
    );
    
    // const boxes = [];
    // for (let i=0; i<times; i++) {
    //     boxes.push(<div key={i}></div>)
    // }

    // return boxes;

    //OR better way
    const boxes = Array(times).fill(0).map((_,i)=> {

        return (
            // this is the fixed outsider black div 
        <div key={i} className={outerClassNames}>
            {/* // the div that rotate forever from  left to right*/}
            <div className={innerClassNames}/>
        </div>)
    })
  return boxes;

}

export default Skeleton;