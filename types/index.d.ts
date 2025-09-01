// Image file type declarations
// import type { ImageSourcePropType } from "react-native";
// import type { Models } from "react-native-appwrite";

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

export interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  type: string;
}

export interface Category extends Models.Document {
  name: string;
  description: string;
}

export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface CartItemType {
  id: string; // menu item id
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "quantity">) => void;
  removeItem: (id: string, customizations?: CartCustomization[]) => void;
  increaseQty: (id: string, customizations?: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations?: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

declare global {
  interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
  }

  interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
  }

  interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
  }

  interface CustomHeaderProps {
    title?: string;
  }

  interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  }

  interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
  }

  interface CreateUserParams {
    email: string;
    password: string;
    name: string;
  }

  interface SignInParams {
    email: string;
    password: string;
  }

  interface GetMenuParams {
    category: string;
    query: string;
  }

  interface LocationData {
    id: string;
    name: string;
    address: string;
    lat: number;
    lon: number;
    distance?: string;
  }
  interface FoodItemCardType {
    meal: string;
    ingredients: string;
    rating: string;
    image: string;
    
  }
}



