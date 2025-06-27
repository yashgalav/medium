
type AvatarProps = {
  fullName: string;
};
export default function Avatar({fullName }:AvatarProps) {
    if (typeof fullName !== "string") return null; 
    const nameList = fullName.split(" ");

    let nameInitails  = nameList[0].charAt(0) + nameList[nameList.length -1].charAt(0);
    if(nameList.length == 1)
        nameInitails  = nameList[0].charAt(0)
    
    

    return (
        <div>
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{nameInitails.toUpperCase()}</span>
            </div>
        </div>
    )
}
