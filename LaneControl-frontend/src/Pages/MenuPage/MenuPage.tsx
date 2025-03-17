import MenuItem from "../../Components/MenuItem/MenuItem"


type Props = {}

const MenuPage = (props: Props) => {
    
    return (
        <div>
          <p className="text-gray-700 text-lg mb-6 py-6 px-20">
          Welcome to our Kitchen! Dive into our menu filled with delicious snacks, refreshing drinks, and hearty meals to fuel your game. Find your favorites and enjoy every bite!
            </p>
            <MenuItem />
        </div>
        
      )
}

export default MenuPage