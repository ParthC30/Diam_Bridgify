/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useSwitchChain, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { diam } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { BackgroundGradient } from '../ui/background-gradient';
import { Asset, Keypair } from 'diamante-sdk-js';
import { config, transferAssets } from '../../utils/utils';
import { useWallet } from '../../WalletContext';
import { privateKeyToAccount } from 'viem/accounts';
import bridgeAbi from '../../abi/bridge.json';
import { sendTransaction } from '@wagmi/core';
import { ethers } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { LoadingButton } from '../ui/LoadingButton';
import { CopyIcon, ReloadIcon } from '@radix-ui/react-icons';




const protocolPair = Keypair.fromSecret('SBW4LVK5V7IQEBAHASVIIO6C7B5B7L3WKDDFTRANMGWAX3Q2J26UVSGR');
const eth = new Asset(
  "ETH",
  protocolPair.publicKey()
);
const usdc = new Asset(
  "USDC",
  protocolPair.publicKey()
);
const usdt = new Asset(
  "USDT",
  protocolPair.publicKey()
);

const WidgetDiamtoBsc = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState('');
  const [deposit, setDeposit] = useState(false);
  const [amount, setAmount] = useState('');
  const { data } = useWallet();

  const privateKey = '0x3f66a86fa9d57ed2535e9e36802e3ec0d82488e7c24984cb150203e1a6229c88';
  const provider = new ethers.JsonRpcProvider('https://rpc.test.btcs.network');
  const signer = new ethers.Wallet(privateKey, provider);
  const userPair = Keypair.fromSecret(data?.secret_key);

  const fetchBalance = async () => {
    const response = await axios.get(`https://diamtestnet.diamcircle.io/accounts/${data?.public_key}`)
    setBalance(response?.data?.balances[0]?.balance);
  }

  useEffect(() => {
    fetchBalance();
  }, [deposit])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDeposit(true);
      await transferAssets(userPair, protocolPair.publicKey(), usdc, amount)
      const contract = new ethers.Contract(
        '0xeBEEEb9764e4bE3D7C32272214f314b5c5942Efc',
        bridgeAbi,
        signer
      )
      const tx = await contract.bridgeBack(
        '0x3287ec4f30f18230C4e0e9AC0395923371BcD1bc',
        parseEther(amount),
        address
      )
      await tx.wait();

      toast.success(`Bridge was successfully!`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setDeposit(false);

    } catch (error) {
      console.error(error?.message);
      toast.error(`Approve failed: ${error.message}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.public_key)
  }


  return (
    <div className="text-white font-mono h-full w-full flex justify-center items-center relative">
      <ToastContainer />
      <div className="max-w-lg mx-auto ">
        <BackgroundGradient className="rounded-[22px] w-full p-10 bg-white dark:bg-zinc-900">
          <div className="flex justify-between text-sm mb-4">
            <button className="bg-zinc-800 py-1 px-3 rounded hover:bg-zinc-800">WITHDRAW</button>
            <button className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800" onClick={() => {
              navigate('/BSC_diam')
            }}>DEPOSIT</button>
            <button className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800">HISTORY</button>
          </div>

          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">FROM</label>
            <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
              <span className="flex items-center">
                <img src={diam} width='30px' alt="Botanix" className="mr-2" />
                Diamante
              </span>
              <span className='flex justify-center items-center gap-2'>
                {`${data.public_key.slice(0, 5)}....${data.public_key.slice(50, 56)} `}
                <CopyIcon onClick={handleCopy} className='cursor-pointer'/>
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
              <input type="text" placeholder="0.0" className="bg-transparent text-lg w-full h-full p-2" onChange={(e) => { setAmount(e.target.value) }} />
              <span className="flex items-center pr-4">
                <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" width='20px' alt="ETH" className="mx-2" />
                USDC
              </span>
            </div>
            <div className="flex items-center text-sm mt-1">
              <span>
                {balance ? <span>Balance: {parseInt(balance).toFixed(2)}</span> : 'Balance: 0.00'}
              </span>
              <button className="text-yellow-300 pl-2 cursor-pointer">MAX</button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">TO</label>
            <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
              <span className="flex items-center">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAANlBMVEVHcEz/kg//kRD/khD/khD/kQ//kRD/khD/khD/khD/khD/khD/kg//khD/khD/khD/kRD/khBKYpzSAAAAEnRSTlMADjaxxkQrje3/+J8fftHcaVb5nJcdAAAA8ElEQVR4AZXSBRLDMAwEQLMFxv9/theecqtw1myZ+7DmXVjnQ3zDKROzqHtBpTbmFph7TY82grBklyqhyLij5PHPr/05RdshXgPJIJp4yx4eO1jtZmn5qCgzKHip+DuWwnHFSOyTsdEvfcUQpjUWbc8Dk0nacln7qAFFC13ojAZ3jq5Ok+7Q12t8I7/FGaS9QReEObxGC3qP9DfmNi9sD1hqULcjjTtcqjnteUUUcoF3LHjjdTuaWOkRmyPYc3fMu4PX7bATNxBVc7+jbYJNDCAtlyHilgtOhcXPp7ycHlXQfhj2Vf4NEN3l3h1nBf0YNzacDGHZaCkyAAAAAElFTkSuQmCC" width='30px' alt="Ethereum" className="mr-2" />
                CORE DAO
              </span>
            </div>
          </div>
          {isConnected ? (
            <div>
              {deposit ? (
                <LoadingButton disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </LoadingButton>
              ) : (
                <button className="w-full h-12 bg-yellow-300 text-black my-3 py-2 rounded" onClick={handleSubmit}>Submit</button>
              )}
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <ConnectButton />
            </div>
          )}
        </BackgroundGradient>
      </div>
    </div>
  )
}

export default WidgetDiamtoBsc
