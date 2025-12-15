// MeltingPoint core UI
const tasks = document.getElementById('tasks');
document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.value) {
    const d = document.createElement('div');
    d.className = 'ice';
    d.textContent = e.target.value;
    d.addEventListener('touchstart', start => {
      const y = start.touches[0].clientY;
      d.addEventListener('touchend', end => {
        if (y - end.changedTouches[0].clientY > 80) d.remove();
      }, { once:true });
    });
    tasks.appendChild(d);
    e.target.value = '';
  }
});

// TIP SYSTEM
import { Attribution } from "https://esm.sh/ox/erc8021";
const BUILDER_CODE = "bc_ubvf8miz";
const DEV_RECIPIENT = "0x04514c3d1a7074E6972190A5632875F4d14785F8";

document.getElementById('tipBtn').onclick = async () => {
  const amount = prompt("Tip in USDC (1/5/10/25/custom):","1");
  if (!amount) return;
  const [from] = await ethereum.request({ method: 'eth_requestAccounts' });
  const value = BigInt(parseFloat(amount)*1e6).toString(16);
  const data = '0xa9059cbb' + DEV_RECIPIENT.slice(2).padStart(64,'0') + value.padStart(64,'0');
  const dataSuffix = Attribution.toDataSuffix({ codes:[BUILDER_CODE] });

  await ethereum.request({
    method: 'wallet_sendCalls',
    params: [{
      version: "2.0.0",
      from,
      chainId: "0x2105",
      atomicRequired: true,
      calls: [{
        to: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        value: "0x0",
        data: data + dataSuffix.slice(2)
      }]
    }]
  });
  alert("Thank you ❤");
};
