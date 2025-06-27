import { User } from 'lucide-react';
import React, { useEffect, useRef, useState, type HTMLElementType } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { emailAtom, userNameAtom } from '../store/atoms';

export default function Profile() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const email = useRecoilValue(emailAtom);
    const name = useRecoilValue(userNameAtom);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const toggleDropdown = () => setIsOpen(!isOpen);


    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Button */}
            {/* <button
                onClick={toggleDropdown}
                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >

            </button> */}
            <div className="flex items-center space-x-3 hidden md:block">
                <button onClick={toggleDropdown} className="p-1 rounded-full hover:bg-gray-100">
                    <div className="h-8 w-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                    </div>
                </button>
            </div>


            {/* <!-- Dropdown menu --> */}
            {isOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 hidden md:block">
                    <ul className="py-2 text-sm text-gray-700  ">
                        <li className="px-4 py-3 border-b " role="none">
                            <p className="text-sm text-gray-900 " role="none">
                                {name.toUpperCase()}
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                {email}
                            </p>
                        </li>

                        <li>
                            <a onClick={logout} className="block px-4 py-2 hover:bg-gray-100">
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
